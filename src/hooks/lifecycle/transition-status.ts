import React from 'react';

import { useSafeLayoutEffect } from './safe-layout-effect';

/* ///////////////////////////////////////////////// */

export type HideMode = 'display-none' | 'activity';
export type TransitionStatus = 'starting' | 'ending' | undefined;

export type TransitionStatusState = {
  open: boolean;
  transitionStatus: TransitionStatus;
};

/* ///////////////////////////////////////////////// */

const OPEN_STATE = { 'data-state': 'open' };
const CLOSED_STATE = { 'data-state': 'closed' };

const STARTING_STYLE = { 'data-starting-style': '' };
const ENDING_STYLE = { 'data-ending-style': '' };

// Mirrors Base UI's `transitionStatusMapping`, which is only exported from its internals,
// and maps `open` to `data-state` instead of Base UI's `data-open`/`data-closed`.
export const transitionStatusMapping = {
  open(value: boolean): Record<string, string> {
    return value ? OPEN_STATE : CLOSED_STATE;
  },
  transitionStatus(value: TransitionStatus): Record<string, string> | null {
    if (value === 'starting') {
      return STARTING_STYLE;
    }

    if (value === 'ending') {
      return ENDING_STYLE;
    }

    return null;
  },
};

/* ///////////////////////////////////////////////// */

const getRunningAnimations = (node: HTMLElement | null) => {
  if (!node?.getAnimations) {
    return [];
  }

  return node.getAnimations().filter((animation) => {
    return (
      animation.playState !== 'finished' &&
      animation.effect?.getComputedTiming().endTime !== Number.POSITIVE_INFINITY
    );
  });
};

const whenFinished = (animations: Animation[]) => {
  return Promise.allSettled(animations.map((animation) => animation.finished));
};

/* ///////////////////////////////////////////////// */

export type UseTransitionStatusReturn = ReturnType<typeof useTransitionStatus>;

export interface UseTransitionStatusProps {
  open?: boolean | undefined;
  keepMounted?: boolean | undefined;
  hideMode?: HideMode | undefined;
  animateInitialOpen?: boolean | undefined;
  onOpenChangeComplete?: ((open: boolean) => void) | undefined;
}

export const useTransitionStatus = (props: UseTransitionStatusProps = {}) => {
  const {
    open = false,
    keepMounted = false,
    hideMode = 'display-none',
    animateInitialOpen = false,
  } = props;

  const [initialOpen] = React.useState(open);
  const [changed, setChanged] = React.useState(false);
  const [rendered, setRendered] = React.useState(open && !animateInitialOpen);
  const [transitionStatus, setTransitionStatus] = React.useState<TransitionStatus>(undefined);

  const nodeRef = React.useRef<HTMLElement>(null);
  const latest = React.useRef({ props, changed });

  if (!changed && open !== initialOpen) {
    setChanged(true);
  }

  if (open && !rendered) {
    setRendered(true);
    setTransitionStatus('starting');
  }

  if (open && rendered && transitionStatus === 'ending') {
    setTransitionStatus(undefined);
  }

  if (!open && rendered && transitionStatus !== 'ending') {
    setTransitionStatus('ending');
  }

  useSafeLayoutEffect(() => {
    latest.current = { props, changed };
  });

  useSafeLayoutEffect(() => {
    if (transitionStatus !== 'starting') {
      return;
    }

    const frame = requestAnimationFrame(() => setTransitionStatus(undefined));

    return () => cancelAnimationFrame(frame);
  }, [transitionStatus]);

  useSafeLayoutEffect(() => {
    if (!latest.current.changed && !(open && animateInitialOpen)) {
      return;
    }

    let cancelled = false;
    let frame = 0;

    const complete = () => {
      if (cancelled) {
        return;
      }

      if (!open) {
        setRendered(false);
        setTransitionStatus(undefined);
      }

      latest.current.props.onOpenChangeComplete?.(open);
    };

    const settle = () => {
      const node = nodeRef.current;
      const animations = getRunningAnimations(node);

      if (!node || !animations.length || node.ownerDocument.visibilityState === 'hidden') {
        complete();
        return;
      }

      if (!open) {
        for (const animation of animations) {
          animation.effect?.updateTiming({ fill: 'forwards' });
        }
      }

      whenFinished(animations).then(complete);
    };

    const settleAfter = (frames: number) => {
      frame = requestAnimationFrame(() => (frames > 1 ? settleAfter(frames - 1) : settle()));
    };

    // Opening waits an extra frame for `data-starting-style` to clear, so its transition is running.
    settleAfter(open ? 2 : 1);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [open]);

  const present = open || rendered;
  const mounted = present || keepMounted;

  useSafeLayoutEffect(() => {
    if (!present && hideMode === 'activity') {
      nodeRef.current?.setAttribute('hidden', 'activity');
    }
  }, [present, hideMode]);

  const state: TransitionStatusState = { open, transitionStatus };

  // An element that is open on mount skips its enter keyframes, unless asked otherwise.
  const skipAnimation = !changed && !animateInitialOpen;

  return {
    ref: nodeRef,
    hideMode,
    mounted,
    present,
    state,
    props: {
      hidden: present || hideMode === 'activity' ? undefined : true,
      style: skipAnimation ? { animation: 'none' } : undefined,
    },
  };
};

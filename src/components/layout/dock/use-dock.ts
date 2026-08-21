import type { ListCollection } from '@ark-ui/react';
import type { IconProps } from 'nucleo-ui-fill-18';

import { useHotkey } from '@tanstack/react-hotkeys';
import { type TargetAndTransition, type Transition, useReducedMotion } from 'motion/react';
import { useMutative } from 'use-mutative';

import { useSoundContext } from '@/providers/application';

export enum Direction {
  Left = -1,
  Idle = 0,
  Right = 1,
}

export const TRANSITION: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.25,
};

/* ///////////////////////////////////////////////// */

// Generic over the set of valid panel values, so navigate/state are literal-typed
export type DockState<Value extends string = string> = {
  value: Value;
  direction: Direction;
};

/* ///////////////////////////////////////////////// */

type PanelItemBase = {
  label: string;
  icon: React.FC<IconProps>;
};

export type LinkItem = PanelItemBase & {
  type: 'link';
  href: string;
};

export type TriggerItem<Value extends string = string> = PanelItemBase & {
  type: 'trigger';
  to: Value;
};

export type PanelItem<Value extends string = string> = LinkItem | TriggerItem<Value>;

export type PanelGroup<Value extends string = string> = {
  name: string;
  items: PanelItem<Value>[];
};

export type Panel<Value extends string = string> = {
  value: Value;
  groups: PanelGroup<Value>[];
};

// The two motion shapes returned by getAnimationMotion — fully typed
export type PanelMotion = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

/* ///////////////////////////////////////////////// */

export type UseDockProps = {
  defaultValue?: string;
  collection: ListCollection<Panel>;
  toolbarRef: React.RefObject<HTMLElement | null>;
};

export type UseDockReturn = ReturnType<typeof useDock>;

export const useDock = (props: UseDockProps) => {
  const { collection, defaultValue = collection.firstValue, toolbarRef } = props;

  const { play } = useSoundContext();
  const isReduced = useReducedMotion();

  const [state, dispatch] = useMutative({
    value: defaultValue,
    direction: Direction.Idle,
  });

  const navigate = (to: string) => {
    if (!collection.has(to)) {
      return;
    }

    dispatch((draft) => {
      if (draft.value === to) {
        return;
      }

      const from = collection.indexOf(draft.value);
      const next = collection.indexOf(to);
      const direction: Direction = next > from ? Direction.Left : Direction.Right;

      play('whisper');

      draft.value = to;
      draft.direction = direction;
    });
  };

  const reset = () => {
    dispatch((draft) => {
      if (draft.value === defaultValue) {
        return;
      }

      const from = collection.indexOf(state.value);
      const next = collection.indexOf(defaultValue);
      const direction: Direction = next > from ? Direction.Left : Direction.Right;

      play('whisper');

      draft.value = defaultValue;
      draft.direction = direction;
    });
  };

  const getAnimationMotion = (direction: Direction): PanelMotion => {
    if (isReduced) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }

    const offset = direction === Direction.Left ? '100%' : '-100%';

    return {
      initial: { x: offset, filter: 'blur(4px)', opacity: 0 },
      animate: { x: 0, filter: 'blur(0px)', opacity: 1 },
      exit: { x: offset, filter: 'blur(4px)', opacity: 0 },
    };
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const toolbar = toolbarRef.current;

    if (toolbar == null) {
      return;
    }

    const controls = Array.from(toolbar.querySelectorAll<HTMLElement>('[data-dock-control]'));

    if (controls.length === 0) {
      return;
    }

    const currentIndex = controls.indexOf(document.activeElement as HTMLElement);

    const focusAt = (index: number) => {
      const target = controls[(index + controls.length) % controls.length];
      target?.focus();
    };

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusAt(currentIndex + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusAt(currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusAt(0);
        break;
      case 'End':
        event.preventDefault();
        focusAt(controls.length - 1);
        break;
    }
  };

  useHotkey('Escape', reset);

  const panel = collection.find(state.value);

  return {
    panel,
    state,
    dispatch,
    reset,
    navigate,
    isReduced,
    onKeyDown,
    getAnimationMotion,
  };
};

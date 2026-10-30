'use client';

import type { TransitionStatusState } from '@/hooks/lifecycle';
import type { UseSwapProps } from './use-swap';

import { mergeProps, useRender } from '@base-ui/react';
import { Activity } from 'react';

import { transitionStatusMapping } from '@/hooks/lifecycle';

import { parts } from './swap.anatomy';
import { useSwap } from './use-swap';
import { SwapProvider, useSwapContext } from './use-swap-context';

/* ///////////////////////////////////////////////// */

type ClassName<State> = string | ((state: State) => string | undefined) | undefined;

const resolveClassName = <State,>(className: ClassName<State>, state: State) => {
  return typeof className === 'function' ? className(state) : className;
};

/* ///////////////////////////////////////////////// */

export type RootState = {
  swapped: boolean;
};

export type RootProps = Omit<useRender.ComponentProps<'span', RootState>, 'className'> &
  UseSwapProps & {
    className?: ClassName<RootState>;
  };

export const Root = (props: RootProps) => {
  const {
    render,
    className,
    swap: swapProp,
    keepMounted,
    hideMode,
    animateInitialOpen,
    ...rest
  } = props;

  const swap = useSwap({ swap: swapProp, keepMounted, hideMode, animateInitialOpen });
  const state: RootState = { swapped: swap.swap };

  const element = useRender({
    render,
    state,
    defaultTagName: 'span',
    props: mergeProps(parts.root.attrs, { style: { display: 'inline-grid' } }, rest, {
      className: resolveClassName(className, state),
    }),
  });

  return <SwapProvider value={swap}>{element}</SwapProvider>;
};

/* ///////////////////////////////////////////////// */

export type IndicatorState = TransitionStatusState & {
  type: 'on' | 'off';
};

export type IndicatorProps = Omit<
  useRender.ComponentProps<'span', IndicatorState>,
  'className'
> & {
  type: 'on' | 'off';
  className?: ClassName<IndicatorState>;
};

export const Indicator = (props: IndicatorProps) => {
  const { ref, type, render, className, ...rest } = props;

  const swap = useSwapContext();
  const transition = swap[type];
  const state: IndicatorState = { ...transition.state, type };

  const element = useRender({
    render,
    state,
    stateAttributesMapping: transitionStatusMapping,
    defaultTagName: 'span',
    ref: ref ? [transition.ref, ref] : transition.ref,
    props: mergeProps(
      parts.indicator.attrs,
      transition.props,
      {
        style: {
          gridArea: '1 / 1',
          display: 'inline-flex',
        },
      },
      rest,
      { className: resolveClassName(className, state) },
    ),
  });

  if (!transition.mounted) {
    return null;
  }

  if (transition.hideMode === 'activity') {
    return <Activity mode={transition.present ? 'visible' : 'hidden'}>{element}</Activity>;
  }

  return element;
};

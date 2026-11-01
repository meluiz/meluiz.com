import React from 'react';

import { useSafeLayoutEffect } from '@/hooks/lifecycle';

/* ///////////////////////////////////////////////// */

export type DockValue = string | null;
export type DockChangeReason = 'trigger-press' | 'close-press' | 'escape-key';

export interface DockChangeDetails {
  reason: DockChangeReason;
}

/* ///////////////////////////////////////////////// */

export type UseDockReturn = ReturnType<typeof useDock>;

export interface UseDockProps {
  value?: DockValue | undefined;
  defaultValue?: DockValue | undefined;
  onValueChange?: ((value: DockValue, details: DockChangeDetails) => void) | undefined;
}

export const useDock = (props: UseDockProps = {}) => {
  const { value: valueProp, defaultValue = null, onValueChange } = props;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<DockValue>(defaultValue);

  const id = React.useId();
  const panels = React.useRef(new Map<string, HTMLElement>());
  const triggers = React.useRef(new Map<string, HTMLElement>());
  const pendingFocus = React.useRef<(() => void) | null>(null);

  const value = valueProp === undefined ? uncontrolledValue : valueProp;

  const setValue = (next: DockValue, details: DockChangeDetails) => {
    if (next === value) {
      return;
    }

    if (valueProp === undefined) {
      setUncontrolledValue(next);
    }

    onValueChange?.(next, details);
  };

  const openPanel = (next: string) => {
    pendingFocus.current = () => panels.current.get(next)?.focus({ preventScroll: true });
    setValue(next, { reason: 'trigger-press' });
  };

  const closePanel = (reason: Exclude<DockChangeReason, 'trigger-press'>) => {
    if (value === null) {
      return;
    }

    const previous = value;

    pendingFocus.current = () => triggers.current.get(previous)?.focus({ preventScroll: true });
    setValue(null, { reason });
  };

  const register = (registry: Map<string, HTMLElement>, key: string) => {
    return (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      registry.set(key, node);

      return () => {
        if (registry.get(key) === node) {
          registry.delete(key);
        }
      };
    };
  };

  useSafeLayoutEffect(() => {
    pendingFocus.current?.();
    pendingFocus.current = null;
  }, [value]);

  return {
    value,
    open: value !== null,
    openPanel,
    closePanel,
    triggerId: (key: string) => `${id}-trigger-${key}`,
    panelId: (key: string) => `${id}-panel-${key}`,
    registerTrigger: (key: string) => register(triggers.current, key),
    registerPanel: (key: string) => register(panels.current, key),
  };
};

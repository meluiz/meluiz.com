'use client';

import type { KeyboardEvent } from 'react';
import type { DockValue, UseDockProps } from './use-dock';

import {
  Button as ButtonBase,
  mergeProps,
  Separator as SeparatorBase,
  Toolbar,
  useRender,
} from '@base-ui/react';

import { transitionStatusMapping } from '@/hooks/lifecycle';

import { parts } from './dock.anatomy';
import { close, item, list, panel, positioner, root, separator, trigger } from './dock.styles';
import { useDock } from './use-dock';
import {
  DockListProvider,
  DockProvider,
  useDockContext,
  useDockListContext,
} from './use-dock-context';

/* ///////////////////////////////////////////////// */

const openStateMapping = {
  open: transitionStatusMapping.open,
};

const panelOpenMapping = {
  open(value: boolean): Record<string, string> | null {
    return value ? { 'data-panel-open': '' } : null;
  },
};

/* ///////////////////////////////////////////////// */

export type PositionerProps = useRender.ComponentProps<'div'>;

export const Positioner = (props: PositionerProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.positioner.attrs, rest, {
      className: positioner({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type RootState = {
  value: DockValue;
  open: boolean;
};

export type RootBaseProps = UseDockProps;

export type RootProps = useRender.ComponentProps<'div', RootState> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, value, defaultValue, onValueChange, ...rest } = props;

  const dock = useDock({ value, defaultValue, onValueChange });
  const state: RootState = { value: dock.value, open: dock.open };

  const element = useRender({
    defaultTagName: 'div',
    render,
    state,
    stateAttributesMapping: {
      ...panelOpenMapping,
      value: (current) => (current === null ? null : { 'data-panel': current }),
    },
    props: mergeProps(parts.root.attrs, rest, {
      className: root({ className }),
    }),
  });

  return <DockProvider value={dock}>{element}</DockProvider>;
};

/* ///////////////////////////////////////////////// */

export type ListState = {
  open: boolean;
};

export type ListProps = Omit<useRender.ComponentProps<'div', ListState>, 'render'> &
  Pick<Toolbar.Root.Props, 'render' | 'orientation' | 'loopFocus' | 'disabled'>;

export const List = (props: ListProps) => {
  const {
    ref,
    className,
    render,
    orientation = 'horizontal',
    loopFocus,
    disabled,
    ...rest
  } = props;

  const dock = useDockContext();

  const open = !dock.open;
  const state: ListState = { open };

  const element = useRender({
    render: (
      <Toolbar.Root
        render={render}
        orientation={orientation}
        loopFocus={loopFocus}
        disabled={disabled}
      />
    ),
    state,
    stateAttributesMapping: openStateMapping,
    ref,
    props: mergeProps(parts.list.attrs, { hidden: !open }, rest, {
      className: list({ className }),
    }),
  });

  return <DockListProvider value={{ orientation }}>{element}</DockListProvider>;
};

/* ///////////////////////////////////////////////// */

export type ItemProps = useRender.ComponentProps<'div'>;

export const Item = (props: ItemProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.item.attrs, rest, {
      className: item({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type TriggerState = {
  open: boolean;
  disabled: boolean;
};

export type TriggerBaseProps = {
  value: string;
};

export type TriggerProps = Omit<
  useRender.ComponentProps<'button', TriggerState>,
  'render' | 'value'
> &
  Pick<Toolbar.Button.Props, 'render' | 'nativeButton'> &
  TriggerBaseProps;

export const Trigger = (props: TriggerProps) => {
  const { ref, className, render, value, disabled = false, nativeButton, ...rest } = props;

  const dock = useDockContext();
  const register = dock.registerTrigger(value);

  const open = dock.value === value;
  const state: TriggerState = { open, disabled };

  return useRender({
    render: <Toolbar.Button render={render} disabled={disabled} nativeButton={nativeButton} />,
    state,
    stateAttributesMapping: panelOpenMapping,
    ref: ref ? [register, ref] : register,
    props: mergeProps(
      parts.trigger.attrs,
      {
        id: dock.triggerId(value),
        'aria-expanded': open,
        'aria-controls': open ? dock.panelId(value) : undefined,
        onClick: () => dock.openPanel(value),
      },
      rest,
      { className: trigger({ className }) },
    ),
  });
};

/* ///////////////////////////////////////////////// */

export type PanelState = {
  open: boolean;
  value: string;
};

export type PanelBaseProps = {
  value: string;
  keepMounted?: boolean | undefined;
};

export type PanelProps = Omit<useRender.ComponentProps<'div', PanelState>, 'value'> &
  PanelBaseProps;

export const Panel = (props: PanelProps) => {
  const { ref, className, render, value, keepMounted = false, ...rest } = props;

  const dock = useDockContext();
  const register = dock.registerPanel(value);

  const open = dock.value === value;
  const state: PanelState = { open, value };

  const element = useRender({
    enabled: open || keepMounted,
    defaultTagName: 'div',
    render,
    state,
    stateAttributesMapping: openStateMapping,
    ref: ref ? [register, ref] : register,
    props: mergeProps(
      parts.panel.attrs,
      {
        id: dock.panelId(value),
        role: 'group',
        tabIndex: -1,
        hidden: !open,
        'aria-labelledby': dock.triggerId(value),
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === 'Escape' && open) {
            event.stopPropagation();
            dock.closePanel('escape-key');
          }
        },
      },
      rest,
      { className: panel({ className }) },
    ),
  });

  return element;
};

/* ///////////////////////////////////////////////// */

export type CloseProps = ButtonBase.Props;

export const Close = (props: CloseProps) => {
  const { className, ...rest } = props;

  const dock = useDockContext();

  const closeProps = mergeProps(
    parts.close.attrs,
    { onClick: () => dock.closePanel('close-press') },
    rest,
  );

  return <ButtonBase {...closeProps} className={close({ className })} />;
};

/* ///////////////////////////////////////////////// */

export type SeparatorProps = SeparatorBase.Props;

export const Separator = (props: SeparatorProps) => {
  const { className, orientation, ...rest } = props;

  const dockList = useDockListContext();

  const fallback = dockList?.orientation === 'horizontal' ? 'vertical' : 'horizontal';

  const separatorProps = mergeProps(parts.separator.attrs, rest);

  return (
    <SeparatorBase
      {...separatorProps}
      orientation={orientation ?? fallback}
      className={separator({ className })}
    />
  );
};

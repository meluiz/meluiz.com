import type { VariantsOf } from '@/utils/styles';

import { Accordion, mergeProps, useRender } from '@base-ui/react';

import { parts } from './accordion.anatomy';
import * as styles from './accordion.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps<Value = unknown> = Accordion.Root.Props<Value> & RootBaseProps;

export const Root = <Value,>(props: RootProps<Value>) => {
  const { className, ...rest } = props;

  return (
    <Accordion.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = Accordion.Item.Props & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, ...rest } = props;

  return (
    <Accordion.Item
      {...mergeProps(parts.item.attrs, rest)}
      className={styles.item({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type HeaderBaseProps = VariantsOf<typeof styles.header>;
export type HeaderProps = Accordion.Header.Props & HeaderBaseProps;

export const Header = (props: HeaderProps) => {
  const { className, ...rest } = props;

  return (
    <Accordion.Header
      {...mergeProps(parts.header.attrs, rest)}
      className={styles.header({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type TriggerBaseProps = VariantsOf<typeof styles.trigger>;
export type TriggerProps = Accordion.Trigger.Props & TriggerBaseProps;

export const Trigger = (props: TriggerProps) => {
  const { className, ...rest } = props;

  return (
    <Accordion.Trigger
      {...mergeProps(parts.trigger.attrs, rest)}
      className={styles.trigger({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = Omit<useRender.ComponentProps<'span'>, 'children'> &
  IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, render, ...rest } = props;

  const indicatorProps = {
    'aria-hidden': true,
  };

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.indicator.attrs, indicatorProps, rest, {
      className: styles.indicator({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type PanelBaseProps = VariantsOf<typeof styles.panel>;
export type PanelProps = Accordion.Panel.Props & PanelBaseProps;

export const Panel = (props: PanelProps) => {
  const { className, children, ...rest } = props;

  return (
    <Accordion.Panel
      {...mergeProps(parts.panel.attrs, rest)}
      className={styles.panel({ className })}
    >
      <div {...parts.content.attrs} className={styles.content()}>
        {children}
      </div>
    </Accordion.Panel>
  );
};

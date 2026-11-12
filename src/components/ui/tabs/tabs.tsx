import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Tabs, useRender } from '@base-ui/react';

import { parts } from './tabs.anatomy';
import * as styles from './tabs.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Tabs.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <Tabs.Root {...mergeProps(parts.root.attrs, rest)} className={styles.root({ className })} />
  );
};

/* ///////////////////////////////////////////////// */

export type ListBaseProps = VariantsOf<typeof styles.list>;
export type ListProps = Tabs.List.Props & ListBaseProps;

export const List = (props: ListProps) => {
  const { className, ...rest } = props;

  return (
    <Tabs.List {...mergeProps(parts.list.attrs, rest)} className={styles.list({ className })} />
  );
};

/* ///////////////////////////////////////////////// */

export type TabBaseProps = VariantsOf<typeof styles.tab>;
export type TabProps = Tabs.Tab.Props & TabBaseProps;

export const Tab = (props: TabProps) => {
  const { className, ...rest } = props;

  return (
    <Tabs.Tab
      {...(mergeProps(parts.tab.attrs, rest) as TabProps)}
      className={styles.tab({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndexBaseProps = VariantsOf<typeof styles.index>;
export type IndexProps = useRender.ComponentProps<'span'> & IndexBaseProps;

export const Index = (props: IndexProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.index.attrs, rest, {
      className: styles.index({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type PanelBaseProps = VariantsOf<typeof styles.panel>;
export type PanelProps = Tabs.Panel.Props & PanelBaseProps;

export const Panel = (props: PanelProps) => {
  const { className, ...rest } = props;

  return (
    <Tabs.Panel
      {...(mergeProps(parts.panel.attrs, rest) as PanelProps)}
      className={styles.panel({ className })}
    />
  );
};

import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './timeline.anatomy';
import { aside, content, item, root } from './timeline.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof root>;
export type RootProps = useRender.ComponentProps<'ol'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'ol',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      className: root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof item>;
export type ItemProps = useRender.ComponentProps<'li'> & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'li',
    render,
    props: mergeProps(parts.item.attrs, rest, {
      className: item({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type AsideBaseProps = VariantsOf<typeof aside>;
export type AsideProps = useRender.ComponentProps<'div'> & AsideBaseProps;

export const Aside = (props: AsideProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.aside.attrs, rest, {
      className: aside({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ContentBaseProps = VariantsOf<typeof content>;
export type ContentProps = useRender.ComponentProps<'div'> & ContentBaseProps;

export const Content = (props: ContentProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.content.attrs, rest, {
      className: content({ className }),
    }),
  });
};

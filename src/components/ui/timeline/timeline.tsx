import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './timeline.anatomy';
import { aside, content, item, root } from './timeline.styles';

/* ///////////////////////////////////////////////// */

export type RootProps = useRender.ComponentProps<'ol'> & VariantsOf<typeof root>;

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

export type ItemProps = useRender.ComponentProps<'li'> & VariantsOf<typeof item>;

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

export type AsideProps = useRender.ComponentProps<'div'> & VariantsOf<typeof aside>;

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

export type ContentProps = useRender.ComponentProps<'div'> & VariantsOf<typeof content>;

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

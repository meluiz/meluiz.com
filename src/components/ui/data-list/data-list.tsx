import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './data-list.anatomy';
import * as styles from './data-list.styles';

export type RootBaseProps = VariantsOf<typeof styles.root> & {
  orientation?: 'horizontal' | 'vertical';
};

export type RootProps = useRender.ComponentProps<'dl'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, orientation = 'vertical', render, ...rest } = props;

  const rootProps = {
    'data-orientation': orientation,
  };

  return useRender({
    defaultTagName: 'dl',
    render,
    props: mergeProps(parts.root.attrs, rootProps, rest, {
      className: styles.root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ItemProps = useRender.ComponentProps<'div'> & VariantsOf<typeof styles.item>;

export const Item = (props: ItemProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.item.attrs, rest, {
      className: styles.item({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type TermProps = useRender.ComponentProps<'dt'> & VariantsOf<typeof styles.term>;

export const Term = (props: TermProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'dt',
    render,
    props: mergeProps(parts.term.attrs, rest, {
      className: styles.term({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type DetailsProps = useRender.ComponentProps<'dd'> & VariantsOf<typeof styles.details>;

export const Details = (props: DetailsProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'dd',
    render,
    props: mergeProps(parts.details.attrs, rest, {
      className: styles.details({ className }),
    }),
  });
};

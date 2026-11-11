import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './ruled-grid.anatomy';
import * as styles from './ruled-grid.styles';

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = useRender.ComponentProps<'div'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      className: styles.root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type CellBaseProps = VariantsOf<typeof styles.cell>;
export type CellProps = useRender.ComponentProps<'div'> & CellBaseProps;

export const Cell = (props: CellProps) => {
  const { className, inset, interactive, render, stretch, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.cell.attrs, rest, {
      className: styles.cell({ className, inset, interactive, stretch }),
    }),
  });
};

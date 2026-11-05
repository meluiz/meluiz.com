import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './ruled-grid.anatomy';
import { cell, root } from './ruled-grid.styles';

export type RootBaseProps = VariantsOf<typeof root>;
export type RootProps = useRender.ComponentProps<'div'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      className: root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type CellBaseProps = VariantsOf<typeof cell>;
export type CellProps = useRender.ComponentProps<'div'> & CellBaseProps;

export const Cell = (props: CellProps) => {
  const { className, inset, interactive, render, stretch, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.cell.attrs, rest, {
      className: cell({ className, inset, interactive, stretch }),
    }),
  });
};

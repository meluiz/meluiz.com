import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './ruled-grid.anatomy';
import { cell, root } from './ruled-grid.styles';

export type RootProps = useRender.ComponentProps<'div'> & VariantsOf<typeof root>;

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

export type CellProps = useRender.ComponentProps<'div'> & VariantsOf<typeof cell>;

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

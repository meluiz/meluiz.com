import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './skeleton.anatomy';
import { root } from './skeleton.styles';

export type SkeletonBaseProps = VariantsOf<typeof root>;
export type SkeletonProps = useRender.ComponentProps<'span'> & SkeletonBaseProps;

export const Skeleton = (props: SkeletonProps) => {
  const { className, render, animation, ...rest } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, { 'aria-hidden': true }, rest, {
      className: root({ animation, className }),
    }),
  });
};

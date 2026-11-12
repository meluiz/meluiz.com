import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './skeleton.anatomy';
import * as styles from './skeleton.styles';

export type SkeletonBaseProps = VariantsOf<typeof styles.root>;
export type SkeletonProps = useRender.ComponentProps<'span'> & SkeletonBaseProps;

export const Skeleton = (props: SkeletonProps) => {
  const { className, render, animation, ...rest } = props;

  const skeletonProps = {
    'aria-hidden': true,
  };

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, skeletonProps, rest, {
      className: styles.root({ animation, className }),
    }),
  });
};

import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './tag.anatomy';
import * as styles from './tag.styles';

export type TagBaseProps = VariantsOf<typeof styles.root>;
export type TagProps = useRender.ComponentProps<'span'> & TagBaseProps;

export const Tag = (props: TagProps) => {
  const { className, render, tone, ...rest } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      'data-tone': tone ?? 'default',
      className: styles.root({ className, tone }),
    }),
  });
};

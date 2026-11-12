import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './tag.anatomy';
import * as styles from './tag.styles';

export type TagBaseProps = VariantsOf<typeof styles.root>;
export type TagProps = useRender.ComponentProps<'span'> & TagBaseProps;

export const Tag = (props: TagProps) => {
  const { className, render, tone, ...rest } = props;

  const tagProps = {
    'data-tone': tone ?? 'default',
  };

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, tagProps, rest, {
      className: styles.root({ className, tone }),
    }),
  });
};

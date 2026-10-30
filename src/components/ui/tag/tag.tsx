import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './tag.anatomy';
import { root } from './tag.styles';

export type TagProps = useRender.ComponentProps<'span'> & VariantsOf<typeof root>;

export const Tag = (props: TagProps) => {
  const { className, render, tone, ...rest } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      'data-tone': tone ?? 'default',
      className: root({ className, tone }),
    }),
  });
};

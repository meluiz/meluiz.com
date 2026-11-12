import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './textarea.anatomy';
import * as styles from './textarea.styles';

export type TextareaBaseProps = VariantsOf<typeof styles.root>;
export type TextareaProps = useRender.ComponentProps<'textarea'> & TextareaBaseProps;

export const Textarea = (props: TextareaProps) => {
  const { autoresize, className, compact, intent, render, size, ...rest } = props;

  const textareaProps = {
    'aria-disabled': ariaAttr(rest.disabled),
    'data-disabled': dataAttr(rest.disabled),
    'data-readonly': dataAttr(rest.readOnly),
    rows: compact ? 1 : undefined,
  };

  return useRender({
    render,
    defaultTagName: 'textarea',
    props: mergeProps(parts.root.attrs, textareaProps, rest, {
      className: styles.root({ autoresize, className, compact, intent, size }),
    }),
  });
};

import type { VariantsOf } from '@/utils/styles';

import { Input as BaseInput, mergeProps } from '@base-ui/react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './input.anatomy';
import * as styles from './input.styles';

export type InputBaseProps = VariantsOf<typeof styles.root>;
export type InputProps = BaseInput.Props & InputBaseProps;

export const Input = (props: InputProps) => {
  const { className, intent, size, ...rest } = props;

  const inputProps = {
    'aria-disabled': ariaAttr(rest.disabled),
    'data-disabled': dataAttr(rest.disabled),
    'data-readonly': dataAttr(rest.readOnly),
  };

  return (
    <BaseInput
      {...mergeProps(parts.root.attrs, rest, inputProps)}
      className={styles.root({ className, intent, size })}
    />
  );
};

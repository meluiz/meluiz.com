import type { VariantsOf } from '@/utils/styles';

import { Button as BaseButton, mergeProps } from '@base-ui/react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './button.anatomy';
import * as styles from './button.styles';

export type ButtonBaseProps = VariantsOf<typeof styles.root> & {
  native?: boolean;
  focusable?: boolean;
};

export type ButtonProps = Omit<BaseButton.Props, 'nativeButton' | 'focusableWhenDisabled'> &
  ButtonBaseProps;

export const Button = (props: ButtonProps) => {
  const {
    className,
    compact,
    focusable = false,
    native = true,
    intent,
    size,
    variant,
    ...rest
  } = props;

  const buttonProps = {
    'aria-disabled': ariaAttr(rest.disabled),
    'data-disabled': dataAttr(rest.disabled),
  };

  return (
    <BaseButton
      {...mergeProps(parts.root.attrs, buttonProps, rest)}
      className={styles.root({ className, compact, intent, size, variant })}
      nativeButton={native}
      focusableWhenDisabled={focusable}
    />
  );
};

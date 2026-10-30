import type { VariantsOf } from '@/utils/styles';

import { Button as ButtonBase, mergeProps } from '@base-ui/react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './button.anatomy';
import { root } from './button.styles';

type ButtonBaseProps = Omit<ButtonBase.Props, 'nativeButton' | 'focusableWhenDisabled'> &
  VariantsOf<typeof root>;

export type ButtonProps = ButtonBaseProps & {
  native?: boolean;
  focusable?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    className,
    compact,
    focusable = false,
    native = true,
    size,
    variant,
    ...rest
  } = props;

  const buttonProps = mergeProps(parts.root.attrs, rest);

  return (
    <ButtonBase
      {...buttonProps}
      className={root({ className, compact, size, variant })}
      aria-disabled={ariaAttr(rest.disabled)}
      data-disabled={dataAttr(rest.disabled)}
      nativeButton={native}
      focusableWhenDisabled={focusable}
    />
  );
};

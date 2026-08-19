import type { HTMLArkProps } from '@ark-ui/react';
import type { VariantProps } from 'tailwind-variants';

import { ark } from '@ark-ui/react';

import { parts } from './button.anatomy';
import { label, root } from './button.styles';

/* --------------------------------------------------------------------------------
 * Button - Root
 * -------------------------------------------------------------------------------- */

export type RootProps = RootBaseProps & HTMLArkProps<'button'>;
export type RootBaseProps = VariantProps<typeof root>;

export const Root = (props: RootProps) => {
  const { className, compact, size, variant, ...rest } = props;

  return (
    <ark.button
      type="button"
      {...parts.root.attrs}
      className={root({
        className,
        variant,
        compact,
        size,
      })}
      {...rest}
    />
  );
};

/* --------------------------------------------------------------------------------
 * Button - Label
 * -------------------------------------------------------------------------------- */

export type LabelProps = LabelBaseProps & HTMLArkProps<'span'>;
export type LabelBaseProps = VariantProps<typeof label>;

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;
  return <ark.span {...parts.label.attrs} className={label({ className })} {...rest} />;
};

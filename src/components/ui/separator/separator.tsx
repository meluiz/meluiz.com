import type { VariantProps } from 'tailwind-variants';

import { ark, type HTMLArkProps, type HTMLProps, mergeProps } from '@ark-ui/react';

import { root } from './separator.styles';
import { useSeparator } from './use-separator';

/* --------------------------------------------------------------------------------
 * Separator - Root
 * -------------------------------------------------------------------------------- */

export type RootProps = RootBaseProps & HTMLArkProps<'div'>;
export type RootBaseProps = VariantProps<typeof root>;

export const Root = (props: RootProps) => {
  const { className, orientation, lighten, ...rest } = props;

  const separator = useSeparator({ orientation });
  const mergedProps = mergeProps<HTMLProps<'span'>>(separator.getRootProps(), rest);

  return <ark.div {...mergedProps} className={root({ className, orientation, lighten })} />;
};

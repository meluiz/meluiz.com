import type { VariantsOf } from '@/utils/styles';

import { Separator as BaseSeparator, mergeProps } from '@base-ui/react';

import { parts } from './separator.anatomy';
import { root } from './separator.styles';

export type SeparatorBaseProps = VariantsOf<typeof root>;
export type SeparatorProps = BaseSeparator.Props & SeparatorBaseProps;

export const Separator = (props: SeparatorProps) => {
  const { className, strength, ...rest } = props;

  const separatorProps = mergeProps(parts.root.attrs, rest);

  return <BaseSeparator {...separatorProps} className={root({ className, strength })} />;
};

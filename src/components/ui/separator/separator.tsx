import type { VariantsOf } from '@/utils/styles';

import { Separator as BaseSeparator, mergeProps } from '@base-ui/react';

import { parts } from './separator.anatomy';
import * as styles from './separator.styles';

export type SeparatorBaseProps = VariantsOf<typeof styles.root>;
export type SeparatorProps = BaseSeparator.Props & SeparatorBaseProps;

export const Separator = (props: SeparatorProps) => {
  const { className, strength, ...rest } = props;

  const separatorProps = mergeProps(parts.root.attrs, rest);

  return <BaseSeparator {...separatorProps} className={styles.root({ className, strength })} />;
};

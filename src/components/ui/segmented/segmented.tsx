import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Radio, RadioGroup } from '@base-ui/react';

import { parts } from './segmented.anatomy';
import * as styles from './segmented.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = RadioGroup.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, intent, ...rest } = props;

  return (
    <RadioGroup
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = Radio.Root.Props & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, ...rest } = props;

  return (
    <Radio.Root
      {...(mergeProps(parts.item.attrs, rest) as ItemProps)}
      className={styles.item({ className })}
    />
  );
};

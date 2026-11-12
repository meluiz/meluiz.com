import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Radio, RadioGroup } from '@base-ui/react';

import { parts } from './radio.anatomy';
import * as styles from './radio.styles';

/* ///////////////////////////////////////////////// */

export type GroupBaseProps = VariantsOf<typeof styles.group>;
export type GroupProps = RadioGroup.Props & GroupBaseProps;

export const Group = (props: GroupProps) => {
  const { className, ...rest } = props;

  return (
    <RadioGroup
      {...mergeProps(parts.group.attrs, rest)}
      className={styles.group({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Radio.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, intent, ...rest } = props;

  return (
    <Radio.Root
      {...(mergeProps(parts.root.attrs, rest) as RootProps)}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = Omit<Radio.Indicator.Props, 'children'> & IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, keepMounted = true, ...rest } = props;

  return (
    <Radio.Indicator
      {...mergeProps(parts.indicator.attrs, rest)}
      keepMounted={keepMounted}
      className={styles.indicator({ className })}
    />
  );
};

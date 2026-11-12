import type { VariantsOf } from '@/utils/styles';

import { Checkbox, mergeProps } from '@base-ui/react';
import { IconCheckmark1Small, IconMinusSmall } from '@central-icons/outlined-sharp';

import { parts } from './checkbox.anatomy';
import * as styles from './checkbox.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Checkbox.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, intent, ...rest } = props;

  return (
    <Checkbox.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = Omit<Checkbox.Indicator.Props, 'children'> & IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, keepMounted = true, ...rest } = props;

  return (
    <Checkbox.Indicator
      {...mergeProps(parts.indicator.attrs, rest)}
      keepMounted={keepMounted}
      className={styles.indicator({ className })}
    >
      <IconCheckmark1Small
        {...parts.check_icon.attrs}
        aria-hidden
        className={styles.checkIcon()}
      />
      <IconMinusSmall
        {...parts.indeterminate_icon.attrs}
        aria-hidden
        className={styles.indeterminateIcon()}
      />
    </Checkbox.Indicator>
  );
};

import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Switch } from '@base-ui/react';

import { parts } from './switch.anatomy';
import * as styles from './switch.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Switch.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, intent, ...rest } = props;

  return (
    <Switch.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ThumbBaseProps = VariantsOf<typeof styles.thumb>;
export type ThumbProps = Switch.Thumb.Props & ThumbBaseProps;

export const Thumb = (props: ThumbProps) => {
  const { className, ...rest } = props;

  return (
    <Switch.Thumb
      {...mergeProps(parts.thumb.attrs, rest)}
      className={styles.thumb({ className })}
    />
  );
};

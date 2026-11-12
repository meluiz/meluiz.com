import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Progress } from '@base-ui/react';

import { parts } from './progress.anatomy';
import * as styles from './progress.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Progress.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, intent, value, ...rest } = props;

  return (
    <Progress.Root
      {...mergeProps(parts.root.attrs, rest)}
      value={value}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type LabelBaseProps = VariantsOf<typeof styles.label>;
export type LabelProps = Progress.Label.Props & LabelBaseProps;

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;

  return (
    <Progress.Label
      {...mergeProps(parts.label.attrs, rest)}
      className={styles.label({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ValueBaseProps = VariantsOf<typeof styles.value>;
export type ValueProps = Progress.Value.Props & ValueBaseProps;

export const Value = (props: ValueProps) => {
  const { className, ...rest } = props;

  return (
    <Progress.Value
      {...mergeProps(parts.value.attrs, rest)}
      className={styles.value({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type TrackBaseProps = VariantsOf<typeof styles.track>;
export type TrackProps = Progress.Track.Props & TrackBaseProps;

export const Track = (props: TrackProps) => {
  const { className, ...rest } = props;

  return (
    <Progress.Track
      {...mergeProps(parts.track.attrs, rest)}
      className={styles.track({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = Progress.Indicator.Props & IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, ...rest } = props;

  return (
    <Progress.Indicator
      {...mergeProps(parts.indicator.attrs, rest)}
      className={styles.indicator({ className })}
    />
  );
};

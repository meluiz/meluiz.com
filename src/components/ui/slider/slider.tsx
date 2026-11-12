import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Slider } from '@base-ui/react';

import { parts } from './slider.anatomy';
import * as styles from './slider.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps<Value extends number | readonly number[] = number> =
  Slider.Root.Props<Value> & RootBaseProps;

export const Root = <Value extends number | readonly number[] = number>(
  props: RootProps<Value>,
) => {
  const { className, intent, ...rest } = props;

  return (
    <Slider.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className, intent })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type LabelBaseProps = VariantsOf<typeof styles.label>;
export type LabelProps = Slider.Label.Props & LabelBaseProps;

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Label
      {...mergeProps(parts.label.attrs, rest)}
      className={styles.label({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ValueBaseProps = VariantsOf<typeof styles.value>;
export type ValueProps = Slider.Value.Props & ValueBaseProps;

export const Value = (props: ValueProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Value
      {...mergeProps(parts.value.attrs, rest)}
      className={styles.value({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ControlBaseProps = VariantsOf<typeof styles.control>;
export type ControlProps = Slider.Control.Props & ControlBaseProps;

export const Control = (props: ControlProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Control
      {...mergeProps(parts.control.attrs, rest)}
      className={styles.control({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type TrackBaseProps = VariantsOf<typeof styles.track>;
export type TrackProps = Slider.Track.Props & TrackBaseProps;

export const Track = (props: TrackProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Track
      {...mergeProps(parts.track.attrs, rest)}
      className={styles.track({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = Slider.Indicator.Props & IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Indicator
      {...mergeProps(parts.indicator.attrs, rest)}
      className={styles.indicator({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ThumbBaseProps = VariantsOf<typeof styles.thumb>;
export type ThumbProps = Slider.Thumb.Props & ThumbBaseProps;

export const Thumb = (props: ThumbProps) => {
  const { className, ...rest } = props;

  return (
    <Slider.Thumb
      {...mergeProps(parts.thumb.attrs, rest)}
      className={styles.thumb({ className })}
    />
  );
};

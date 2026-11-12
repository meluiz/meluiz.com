import type { VariantsOf } from '@/utils/styles';

import { mergeProps, NumberField } from '@base-ui/react';
import { IconMinusSmall, IconPlusSmall } from '@central-icons/outlined-sharp';

import { parts } from './number-field.anatomy';
import * as styles from './number-field.styles';

/* ///////////////////////////////////////////////// */

const CURSOR_PATHS = ['M18 8L22 12L18 16', 'M6 8L2 12L6 16', 'M3 12L21 12'];

const ScrubCursorIcon = () => (
  <svg aria-hidden width="24" height="24" viewBox="-2 -2 28 28" fill="none">
    {CURSOR_PATHS.map((d) => (
      <path
        key={`outline-${d}`}
        d={d}
        stroke="white"
        strokeWidth="4.4"
        strokeLinecap="square"
      />
    ))}
    {CURSOR_PATHS.map((d) => (
      <path key={d} d={d} stroke="black" strokeWidth="2" strokeLinecap="square" />
    ))}
  </svg>
);

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = NumberField.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <NumberField.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ScrubAreaBaseProps = VariantsOf<typeof styles.scrubArea>;
export type ScrubAreaProps = NumberField.ScrubArea.Props & ScrubAreaBaseProps;

export const ScrubArea = (props: ScrubAreaProps) => {
  const { className, ...rest } = props;

  return (
    <NumberField.ScrubArea
      {...mergeProps(parts.scrub_area.attrs, rest)}
      className={styles.scrubArea({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ScrubAreaCursorBaseProps = VariantsOf<typeof styles.scrubAreaCursor>;
export type ScrubAreaCursorProps = NumberField.ScrubAreaCursor.Props & ScrubAreaCursorBaseProps;

export const ScrubAreaCursor = (props: ScrubAreaCursorProps) => {
  const { className, children = <ScrubCursorIcon />, ...rest } = props;

  return (
    <NumberField.ScrubAreaCursor
      {...mergeProps(parts.scrub_area_cursor.attrs, rest)}
      className={styles.scrubAreaCursor({ className })}
    >
      {children}
    </NumberField.ScrubAreaCursor>
  );
};

/* ///////////////////////////////////////////////// */

export type GroupBaseProps = VariantsOf<typeof styles.group>;
export type GroupProps = NumberField.Group.Props & GroupBaseProps;

export const Group = (props: GroupProps) => {
  const { className, intent, placement, size, ...rest } = props;

  return (
    <NumberField.Group
      {...mergeProps(parts.group.attrs, rest)}
      className={styles.group({ className, intent, placement, size })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type InputBaseProps = VariantsOf<typeof styles.input>;
export type InputProps = NumberField.Input.Props & InputBaseProps;

export const Input = (props: InputProps) => {
  const { className, ...rest } = props;

  return (
    <NumberField.Input
      {...mergeProps(parts.input.attrs, rest)}
      className={styles.input({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type DecrementBaseProps = VariantsOf<typeof styles.decrement>;
export type DecrementProps = NumberField.Decrement.Props & DecrementBaseProps;

export const Decrement = (props: DecrementProps) => {
  const { className, children = <IconMinusSmall />, ...rest } = props;

  return (
    <NumberField.Decrement
      {...mergeProps(parts.decrement.attrs, rest)}
      className={styles.decrement({ className })}
    >
      {children}
    </NumberField.Decrement>
  );
};

/* ///////////////////////////////////////////////// */

export type IncrementBaseProps = VariantsOf<typeof styles.increment>;
export type IncrementProps = NumberField.Increment.Props & IncrementBaseProps;

export const Increment = (props: IncrementProps) => {
  const { className, children = <IconPlusSmall />, ...rest } = props;

  return (
    <NumberField.Increment
      {...mergeProps(parts.increment.attrs, rest)}
      className={styles.increment({ className })}
    >
      {children}
    </NumberField.Increment>
  );
};

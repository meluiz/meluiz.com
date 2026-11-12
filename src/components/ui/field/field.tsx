import type { VariantsOf } from '@/utils/styles';

import { Field, mergeProps } from '@base-ui/react';

import { dataAttr } from '@/utils/dom';

import { parts } from './field.anatomy';
import * as styles from './field.styles';

/* ///////////////////////////////////////////////// */

export const Validity = Field.Validity;

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = Field.Root.Props & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <Field.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type LabelBaseProps = VariantsOf<typeof styles.label>;
export type LabelProps = Field.Label.Props & LabelBaseProps;

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;

  return (
    <Field.Label
      {...mergeProps(parts.label.attrs, rest)}
      className={styles.label({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type InputBaseProps = VariantsOf<typeof styles.input>;
export type InputProps = Omit<Field.Control.Props, 'size'> & InputBaseProps;

export const Input = (props: InputProps) => {
  const { className, intent, size, ...rest } = props;

  const inputProps = {
    'data-readonly': dataAttr(rest.readOnly),
  };

  return (
    <Field.Control
      {...mergeProps(parts.input.attrs, inputProps, rest)}
      className={styles.input({ className, intent, size })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type TextareaBaseProps = VariantsOf<typeof styles.textarea>;
export type TextareaProps = Omit<Field.Control.Props, 'size' | 'render'> &
  Pick<React.ComponentProps<'textarea'>, 'rows' | 'cols' | 'wrap'> &
  TextareaBaseProps;

export const Textarea = (props: TextareaProps) => {
  const { autoresize, className, compact, intent, size, ...rest } = props;

  const textareaProps = {
    rows: compact ? 1 : undefined,
    'data-readonly': dataAttr(rest.readOnly),
  };

  return (
    <Field.Control
      {...mergeProps(parts.textarea.attrs, textareaProps, rest)}
      render={<textarea />}
      className={styles.textarea({ autoresize, className, compact, intent, size })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type DescriptionBaseProps = VariantsOf<typeof styles.description>;
export type DescriptionProps = Field.Description.Props & DescriptionBaseProps;

export const Description = (props: DescriptionProps) => {
  const { className, ...rest } = props;

  return (
    <Field.Description
      {...mergeProps(parts.description.attrs, rest)}
      className={styles.description({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ErrorBaseProps = VariantsOf<typeof styles.error>;
export type ErrorProps = Field.Error.Props & ErrorBaseProps;

// biome-ignore lint/suspicious/noShadowRestrictedNames: intentional — consumed via namespace import (e.g. `<Field.Error />`).
export const Error = (props: ErrorProps) => {
  const { className, ...rest } = props;

  return (
    <Field.Error
      {...mergeProps(parts.error.attrs, rest)}
      className={styles.error({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = Field.Item.Props & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, ...rest } = props;

  return (
    <Field.Item
      {...mergeProps(parts.item.attrs, rest)}
      className={styles.item({ className })}
    />
  );
};

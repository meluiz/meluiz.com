import type { VariantsOf } from '@/utils/styles';
import type { ButtonProps } from '../button';

import { mergeProps, useRender } from '@base-ui/react';

import { Button } from '../button';
import { parts } from './alert.anatomy';
import * as styles from './alert.styles';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = useRender.ComponentProps<'div'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'div',
    props: mergeProps(parts.root.attrs, rest, {
      className: styles.root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type IndicatorBaseProps = VariantsOf<typeof styles.indicator>;
export type IndicatorProps = useRender.ComponentProps<'span'> & IndicatorBaseProps;

export const Indicator = (props: IndicatorProps) => {
  const { className, render, tone, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.indicator.attrs, rest, {
      'data-tone': tone ?? 'plain',
      className: styles.indicator({ className, tone }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ContentBaseProps = VariantsOf<typeof styles.content>;
export type ContentProps = useRender.ComponentProps<'div'> & ContentBaseProps;

export const Content = (props: ContentProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'div',
    props: mergeProps(parts.content.attrs, rest, {
      className: styles.content({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type TitleBaseProps = VariantsOf<typeof styles.title>;
export type TitleProps = useRender.ComponentProps<'p'> & TitleBaseProps;

export const Title = (props: TitleProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'p',
    props: mergeProps(parts.title.attrs, rest, {
      className: styles.title({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type DescriptionBaseProps = VariantsOf<typeof styles.description>;
export type DescriptionProps = useRender.ComponentProps<'p'> & DescriptionBaseProps;

export const Description = (props: DescriptionProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'p',
    props: mergeProps(parts.description.attrs, rest, {
      className: styles.description({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ActionProps = ButtonProps;

export const Action = (props: ActionProps) => {
  const { className, size = 'xsmall', variant = 'outline', ...rest } = props;

  const actionProps = {
    type: 'button',
  } as const;

  return (
    <Button
      {...mergeProps(parts.action.attrs, actionProps, rest)}
      size={size}
      variant={variant}
      className={styles.action({ className })}
    />
  );
};

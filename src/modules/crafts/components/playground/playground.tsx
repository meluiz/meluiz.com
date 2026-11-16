'use client';

import type React from 'react';
import type { ButtonProps } from '@/components/ui';

import { mergeProps, useRender } from '@base-ui/react';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useSoundEffects } from '@/components/providers';
import { Button, Select as SelectBase } from '@/components/ui';
import { useSafeLayoutEffect } from '@/hooks/lifecycle';

import { StatusBar } from './components';
import { parts } from './playground.anatomy';
import * as styles from './playground.styles';
import { usePlayground } from './use-playground';
import { PlaygroundProvider, usePlaygroundContext } from './use-playground-context';

/* ///////////////////////////////////////////////// */

export type StageProps = useRender.ComponentProps<'section'> & {
  hint?: string;
  label?: string;
};

export const Stage = (props: StageProps) => {
  const { children, className, hint, label, render, ...rest } = props;

  const playground = usePlayground();

  const element = useRender({
    defaultTagName: 'section',
    render,
    props: mergeProps(
      parts.stage.attrs,
      { 'aria-labelledby': label ? playground.labelId : undefined },
      rest,
      {
        className: styles.stage({ className }),
        children: (
          <div {...parts.root.attrs} className={styles.root()}>
            {label && (
              <span {...parts.label.attrs} id={playground.labelId} className={styles.label()}>
                {label}
              </span>
            )}
            {children}
            <StatusBar hint={hint} />
          </div>
        ),
      },
    ),
  });

  return <PlaygroundProvider value={playground}>{element}</PlaygroundProvider>;
};

/* ///////////////////////////////////////////////// */

export type InlineProps = useRender.ComponentProps<'figure'> & {
  hint?: string;
  label?: string;
  caption?: string;
};

export const Inline = (props: InlineProps) => {
  const { caption, children, className, hint, label = 'Demo', render, ...rest } = props;

  const playground = usePlayground();

  const element = useRender({
    defaultTagName: 'figure',
    render,
    props: mergeProps(parts.inline.attrs, rest, {
      className: styles.inline({ className }),
      children: (
        <Fragment>
          <div {...parts.root.attrs} className={styles.root()}>
            <span {...parts.label.attrs} className={styles.label()}>
              {label}
            </span>
            <Toolbar />
            {children}
            <StatusBar hint={hint} />
          </div>
          {caption && (
            <figcaption {...parts.caption.attrs} className={styles.caption()}>
              {caption}
            </figcaption>
          )}
        </Fragment>
      ),
    }),
  });

  return <PlaygroundProvider value={playground}>{element}</PlaygroundProvider>;
};

/* ///////////////////////////////////////////////// */

export type ToolbarProps = useRender.ComponentProps<'div'>;

export const Toolbar = (props: ToolbarProps) => {
  const { children, className, render, ...rest } = props;

  const { setToolbarRef } = usePlaygroundContext();

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.toolbar.attrs, { role: 'group', 'aria-label': 'Controls' }, rest, {
      className: styles.toolbar({ className }),
      children: (
        <Fragment>
          <div ref={setToolbarRef} {...parts.actions.attrs} className={styles.actions()} />
          {children}
        </Fragment>
      ),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ActionProps = ButtonProps;

export const Action = (props: ActionProps) => {
  const { className, size = 'xsmall', variant = 'outline', onClick, ...rest } = props;

  const sfx = useSoundEffects();
  const { toolbarRef } = usePlaygroundContext();

  const actionProps = mergeProps(parts.action.attrs, rest, {
    onClick: sfx.play.toggle((event: any) => {
      onClick?.(event);
    }),
  });

  if (toolbarRef == null) {
    return null;
  }

  return createPortal(
    <Button
      {...actionProps}
      size={size}
      variant={variant}
      className={styles.action({ className })}
    />,
    toolbarRef,
  );
};

/* ///////////////////////////////////////////////// */

export interface SelectOption<Value extends string> {
  value: Value;
  label?: string;
}

export interface SelectProps<Value extends string> {
  'aria-label': string;
  className?: string;
  options: readonly SelectOption<Value>[];
  value: Value;
  onValueChange: (value: Value) => void;
}

export const Select = <Value extends string>(props: SelectProps<Value>) => {
  const { className, onValueChange, options, value, 'aria-label': ariaLabel } = props;

  const sfx = useSoundEffects();
  const { toolbarRef } = usePlaygroundContext();

  if (toolbarRef == null) {
    return null;
  }

  const items = options.map((option) => ({
    value: option.value,
    label: option.label ?? option.value,
  }));

  const handleValueChange = sfx.play.toggle((next: Value | null) => {
    if (next != null) {
      onValueChange(next);
    }
  });

  return createPortal(
    <SelectBase.Root items={items} value={value} onValueChange={handleValueChange}>
      <SelectBase.Trigger
        {...parts.select.attrs}
        aria-label={ariaLabel}
        size="xsmall"
        className={styles.select({ className })}
      >
        <span className={styles.selectValue()}>
          {items.map((item) => (
            <span key={item.value} aria-hidden className={styles.selectSizer()}>
              {item.label}
            </span>
          ))}
          <SelectBase.Value />
        </span>
        <SelectBase.Icon />
      </SelectBase.Trigger>
      <SelectBase.Popup size="xsmall" align="end" className={styles.selectPopup()}>
        {items.map((item) => (
          <SelectBase.Item key={item.value} value={item.value}>
            <SelectBase.ItemText>{item.label}</SelectBase.ItemText>
            <SelectBase.ItemIndicator />
          </SelectBase.Item>
        ))}
      </SelectBase.Popup>
    </SelectBase.Root>,
    toolbarRef,
  );
};

/* ///////////////////////////////////////////////// */

export type SourceProps = ButtonProps;

export const Source = (props: SourceProps) => {
  const { className, size = 'xsmall', variant = 'solid', ...rest } = props;

  const sourceProps = mergeProps(parts.trigger.attrs, rest);

  return (
    <Button
      {...sourceProps}
      size={size}
      variant={variant}
      className={styles.trigger({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ResetProps = ButtonProps;

export const Reset = (props: ResetProps) => {
  const { className, size = 'small', variant = 'outline', ...rest } = props;

  const resetProps = mergeProps(parts.trigger.attrs, rest);

  return (
    <Button
      {...resetProps}
      size={size}
      variant={variant}
      className={styles.trigger({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type StatusProps = React.PropsWithChildren;

export const Status = (props: StatusProps) => {
  const { children } = props;

  const { status } = usePlaygroundContext();

  status.seed(children);

  useSafeLayoutEffect(() => {
    status.set(children);
  }, [status, children]);

  useSafeLayoutEffect(() => {
    return () => status.set(null);
  }, [status]);

  return null;
};

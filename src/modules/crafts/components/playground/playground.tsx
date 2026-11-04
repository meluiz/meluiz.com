'use client';

import type React from 'react';
import type { ButtonProps } from '@/components/ui';

import { mergeProps, useRender } from '@base-ui/react';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui';

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
  const { className, size = 'xsmall', variant = 'outline', ...rest } = props;

  const { toolbarRef } = usePlaygroundContext();

  const actionProps = mergeProps(parts.action.attrs, rest);

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

export type SourceProps = ButtonProps;

export const Source = (props: SourceProps) => {
  const { className, size = 'small', variant = 'solid', ...rest } = props;

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

  const { statusBarRef } = usePlaygroundContext();

  if (statusBarRef == null) {
    return null;
  }

  return createPortal(children, statusBarRef);
};

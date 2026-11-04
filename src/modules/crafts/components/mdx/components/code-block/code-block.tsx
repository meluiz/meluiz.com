'use client';

import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';
import React from 'react';

import { parts } from './code-block.anatomy';
import * as styles from './code-block.styles';

export type RootProps = useRender.ComponentProps<'figure'> & VariantsOf<typeof styles.root>;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'figure',
    props: mergeProps(parts.root.attrs, rest, {
      className: styles.root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type HeaderProps = useRender.ComponentProps<'div'> & VariantsOf<typeof styles.header>;

export const Header = (props: HeaderProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'div',
    props: mergeProps(parts.header.attrs, rest, {
      className: styles.header({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type TitleProps = useRender.ComponentProps<'figcaption'> &
  VariantsOf<typeof styles.title>;

export const Title = (props: TitleProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'figcaption',
    props: mergeProps(parts.title.attrs, rest, {
      className: styles.title({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ClipboardProps = useRender.ComponentProps<'button'> &
  VariantsOf<typeof styles.clipboard>;

export const Clipboard = (props: ClipboardProps) => {
  const { className, render, placement, onClick, ...rest } = props;

  const [copied, setCopied] = React.useState(false);

  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const copyProps = {
    'data-state': copied ? 'copied' : 'idle',
    'aria-label': copied ? 'Copied' : 'Copy code',
  };

  const readCode = (button: HTMLElement) => {
    const root = button.closest(parts.root.selector);
    const content = root?.querySelector(parts.content.selector);

    return content?.textContent ?? '';
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    await navigator.clipboard.writeText(readCode(event.currentTarget));

    setCopied(true);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setCopied(false);
    }, 1_500);
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return useRender({
    render,
    defaultTagName: 'button',
    props: mergeProps(parts.clipboard.attrs, copyProps, rest, {
      className: styles.clipboard({ className, placement }),
      onClick: handleClick,
      children: <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>,
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ContentProps = useRender.ComponentProps<'pre'> & VariantsOf<typeof styles.content>;

export const Content = (props: ContentProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'pre',
    props: mergeProps(parts.content.attrs, rest, {
      className: styles.content({ className }),
    }),
  });
};

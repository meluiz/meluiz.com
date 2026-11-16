'use client';

import type { AnatomyPart } from '@/utils/dom';
import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';
import React from 'react';

import { ScrollArea } from '@/components/ui';

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

// `part.selector` is a nesting selector (`&[...]`), where `&` resolves to the element itself
// in `closest()`, so plain attribute selectors are built from `attrs` instead
const toSelector = ({ attrs }: AnatomyPart) => {
  return `[data-scope="${attrs['data-scope']}"][data-part="${attrs['data-part']}"]`;
};

const readCode = (button: HTMLElement) => {
  const root = button.closest(toSelector(parts.root));
  const content = root?.querySelector(toSelector(parts.content));

  return content?.textContent?.trimEnd() ?? '';
};

// `navigator.clipboard` only exists in secure contexts (HTTPS or localhost), so plain-HTTP
// origins such as a LAN IP fall back to the legacy `execCommand` path
const copyWithSelection = (text: string) => {
  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.append(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    textarea.remove();
  }
};

const copyText = async (text: string) => {
  if (text === '') {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    return copyWithSelection(text);
  } catch {
    return copyWithSelection(text);
  }
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

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const isCopied = await copyText(readCode(event.currentTarget));

    if (!isCopied) {
      return;
    }

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
      children: (
        <span aria-live="polite" className={styles.clipboardText()}>
          {copied ? 'Copied' : 'Copy'}
        </span>
      ),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ContentProps = useRender.ComponentProps<'pre'> & VariantsOf<typeof styles.content>;

export const Content = (props: ContentProps) => {
  const { className, render, ...rest } = props;

  const element = useRender({
    render,
    defaultTagName: 'pre',
    props: mergeProps(parts.content.attrs, rest, {
      className: styles.content({ className }),
    }),
  });

  return (
    <ScrollArea.Root className={styles.scroller()}>
      <ScrollArea.Viewport className={styles.viewport()}>{element}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

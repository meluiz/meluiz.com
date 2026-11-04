import type { MDXComponents } from 'mdx/types';
import type { Route } from 'next';

import Link from 'next/link';
import { Fragment } from 'react';

import { freeze } from '@/utils/helpers';

import { CodeBlock } from './components';
import * as styles from './mdx.styles';

/* ///////////////////////////////////////////////// */

const isExternal = (href: string) => {
  return /^https?:\/\//.test(href);
};

export const Anchor = (props: React.ComponentProps<'a'>) => {
  const { href = '', ...rest } = props;

  if (isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
  }

  return <Link href={href as Route} {...rest} />;
};

/* ///////////////////////////////////////////////// */

export const Pre = (props: React.ComponentProps<'pre'>) => {
  const { title, children, style: _style, ...rest } = props;

  return (
    <CodeBlock.Root>
      {title ? (
        <CodeBlock.Header>
          <CodeBlock.Title>{title}</CodeBlock.Title>
          <CodeBlock.Clipboard />
        </CodeBlock.Header>
      ) : (
        <CodeBlock.Clipboard placement="floating" />
      )}
      <CodeBlock.Content {...rest}>{children}</CodeBlock.Content>
    </CodeBlock.Root>
  );
};

/* ///////////////////////////////////////////////// */

export type ComponentsProps = MDXComponents;

export const Components = freeze<MDXComponents>({
  h2: ({ className, ...props }) => <h2 className={styles.h2({ className })} {...props} />,
  h3: ({ className, ...props }) => <h3 className={styles.h3({ className })} {...props} />,
  p: ({ className, ...props }) => <p className={styles.p({ className })} {...props} />,
  a: ({ className, ...props }) => <Anchor className={styles.a({ className })} {...props} />,
  strong: ({ className, ...props }) => (
    <strong className={styles.strong({ className })} {...props} />
  ),

  ul: ({ className, ...props }) => <ul className={styles.ul({ className })} {...props} />,
  ol: ({ className, ...props }) => <ol className={styles.ol({ className })} {...props} />,
  li: ({ className, ...props }) => <li className={styles.li({ className })} {...props} />,
  hr: ({ className, ...props }) => <hr className={styles.hr({ className })} {...props} />,

  pre: Pre,
  blockquote: ({ className, ...props }) => (
    <blockquote className={styles.blockquote({ className })} {...props} {...props} />
  ),

  Demo: Fragment,
});

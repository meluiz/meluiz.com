'use client';

import type React from 'react';
import type { UseHighlightProps } from './use-highlight';

import { Fragment } from 'react';

import { splitProps } from '@/utils/react';

import { useHighlight } from './use-highlight';

export type HighlightProps = React.ComponentProps<'mark'> & UseHighlightProps;

export const Highlight = (props: HighlightProps) => {
  if (typeof props.text !== 'string') {
    throw new Error('text must be a string');
  }

  const [highlightProps, localProps] = splitProps(props, [
    'query',
    'text',
    'ignoreCase',
    'matchAll',
    'exactMatch',
  ]);

  const chunks = useHighlight(highlightProps);

  return (
    <Fragment>
      {chunks.map(({ text, match }, i) =>
        match ? (
          <mark key={i} {...localProps}>
            {text}
          </mark>
        ) : (
          <Fragment key={i}>{text}</Fragment>
        ),
      )}
    </Fragment>
  );
};

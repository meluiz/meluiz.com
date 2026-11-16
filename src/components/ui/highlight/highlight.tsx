'use client';

import type React from 'react';
import type { UseHighlightProps } from './use-highlight';

import { Fragment } from 'react';

import { splitProps } from '@/utils/react';

import { useHighlight } from './use-highlight';

export type HighlightBaseProps = UseHighlightProps;

export type HighlightProps = React.ComponentProps<'span'> & HighlightBaseProps;

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
          // Not a <mark>: Google Translate translates a <mark> apart from its sentence and drops
          // the spaces around it ("Eu construopequenas coisaspara…"); a span keeps the sentence whole
          <span key={i} data-highlight="" role="mark" {...localProps}>
            {text}
          </span>
        ) : (
          <Fragment key={i}>{text}</Fragment>
        ),
      )}
    </Fragment>
  );
};

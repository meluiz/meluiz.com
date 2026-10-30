import type { HighlightChunk, HighlightWordProps } from '@zag-js/highlight-word';

import { highlightWord } from '@zag-js/highlight-word';

/* ///////////////////////////////////////////////// */

export type { HighlightChunk };

/* ///////////////////////////////////////////////// */

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: UseHighlightProps): HighlightChunk[] => {
  return highlightWord(props);
};

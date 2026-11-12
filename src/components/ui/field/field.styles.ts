import { cva } from '@/utils/styles';

import { input as inputStyles } from '../input';
import { textarea as textareaStyles } from '../textarea';

export const root = cva({
  base: 'flex min-w-0 flex-col items-start gap-1.5',
  variants: {},
});

export const label = cva({
  base: 'inline-flex items-center gap-1.5 font-mono text-label text-foreground-soft uppercase',
  variants: {},
});

export const input = cva({
  composes: [inputStyles.root],
  variants: {},
});

export const textarea = cva({
  composes: [textareaStyles.root],
  variants: {},
});

export const description = cva({
  base: 'font-sans text-xs/snug text-foreground-soft',
  variants: {},
});

export const error = cva({
  base: 'font-sans text-xs/snug text-foreground-accent',
  variants: {},
});

export const item = cva({
  base: 'flex',
  variants: {},
});

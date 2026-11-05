import { cva } from '@/utils/styles';

export const root = cva({
  base: '',
  variants: {},
});

export const list = cva({
  base: 'flex flex-wrap items-center gap-1.5 wrap-break-word text-foreground-muted',
  variants: {},
});

export const item = cva({
  base: 'inline-flex items-center gap-1.5 font-mono text-xs/4 font-medium tracking-wide',
  variants: {},
});

export const link = cva({
  base: 'text-foreground-soft decoration-stroke-strong underline-offset-3 hover:text-foreground hover:underline',
  variants: {},
});

export const page = cva({
  base: 'text-foreground',
  variants: {},
});

export const separator = cva({
  composes: [item],
  base: 'text-strong-stroke *:[svg]:size-3.5',
  variants: {},
});

export const ellipsis = cva({
  base: '*:[svg]:size-3.5',
  variants: {},
});

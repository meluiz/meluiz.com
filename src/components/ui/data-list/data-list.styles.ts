import { cva } from '@/utils/styles';

export const root = cva({
  base: 'm-0 flex horizontal:flex-row horizontal:flex-wrap horizontal:gap-x-6 horizontal:gap-y-3 vertical:flex-col vertical:gap-y-3',
  variants: {},
});

export const item = cva({
  base: 'flex min-w-0 flex-col gap-y-0.5',
  variants: {},
});

export const term = cva({
  base: 'font-mono text-xs/tight font-medium tracking-wide text-foreground-muted uppercase',
  variants: {},
});

export const details = cva({
  base: 'text-foregorund m-0 font-mono text-sm/tight tracking-tight wrap-anywhere',
  variants: {},
});

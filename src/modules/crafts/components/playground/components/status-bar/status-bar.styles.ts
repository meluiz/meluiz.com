import { cva } from '@/utils/styles';

export const root = cva({
  base: 'pointer-events-none absolute inset-x-3.5 bottom-3 flex items-end justify-between gap-x-3 gap-y-1.5 max-sm:flex-col max-sm:items-start',
  variants: {},
});

export const status = cva({
  base: 'font-mono text-xs/3.5 tracking-wider text-foreground-muted uppercase',
  variants: {},
});

export const hint = cva({
  base: 'text-right font-mono text-xs/3.5 tracking-wider text-foreground-muted uppercase max-sm:text-left',
  variants: {},
});

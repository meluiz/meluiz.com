import { cn, cva } from '@/utils/styles';

const slot = 'inline-flex h-7 min-w-7 items-center justify-center px-1';

export const root = cva({
  base: '',
  variants: {},
});

export const list = cva({
  base: 'flex items-center gap-1',
  variants: {},
});

export const item = cva({
  base: 'inline-flex',
  variants: {},
});

export const link = cva({
  base: cn([
    slot,
    'text-xs/none border border-transparent font-mono font-medium text-foreground-soft tabular-nums outline-hidden transition-colors duration-150',
    'hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'current-page:border-stroke-strong current-page:bg-inherit current-page:text-foreground current-page:hover:border-stroke-heavy current-page:hover:bg-surface-muted',
  ]),
  variants: {},
});

const step = cn([
  slot,
  'border border-transparent text-foreground-soft outline-hidden transition-colors duration-150 *:[svg]:size-3.5',
  'hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'is-disabled:pointer-events-none is-disabled:text-foreground-muted is-disabled:opacity-46',
]);

export const previous = cva({
  base: step,
  variants: {},
});

export const next = cva({
  base: step,
  variants: {},
});

export const ellipsis = cva({
  base: cn([slot, 'text-xs/none font-mono font-medium text-foreground-muted select-none']),
  variants: {},
});

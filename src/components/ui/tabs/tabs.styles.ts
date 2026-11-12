import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'w-full',
  variants: {},
});

export const list = cva({
  base: 'relative flex gap-1 border-b border-stroke-soft',
  variants: {},
});

export const tab = cva({
  base: cn([
    'relative inline-flex h-9 cursor-pointer items-baseline gap-2 px-2.5 font-mono text-[13px]/9 font-medium text-foreground-soft outline-hidden transition-colors duration-150 ease-out-quint',
    'hover:text-foreground is-selected:text-foreground',
    'after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-foreground-accent after:transition-transform after:duration-200 after:ease-out-quint motion-reduce:after:transition-none is-selected:after:scale-x-100',
    'focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-inset',
    'is-disabled:cursor-not-allowed is-disabled:opacity-56',
  ]),
  variants: {},
});

export const index = cva({
  base: 'text-[11px]',
  variants: {},
});

export const panel = cva({
  base: 'pt-4 font-sans text-body text-foreground-prose outline-hidden focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  variants: {},
});

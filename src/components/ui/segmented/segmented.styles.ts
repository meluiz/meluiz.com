import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'inline-flex overflow-hidden border border-stroke-heavy bg-surface-soft',
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent:
        '[--segmented-color:var(--color-surface-accent)] [--segmented-foreground:var(--color-foreground-on-accent)]',
      support:
        '[--segmented-color:var(--color-surface-support)] [--segmented-foreground:var(--color-foreground-on-support)]',
    },
  },
});

export const item = cva({
  base: cn([
    'text-[11px]/none inline-flex h-7 cursor-pointer items-center px-2.5 font-mono font-medium tracking-[0.04em] text-foreground-soft uppercase outline-hidden not-first:border-l not-first:border-stroke',
    'transition-colors duration-150 ease-out-quint not-is-checked:hover:text-foreground is-checked:bg-(--segmented-color) is-checked:text-(--segmented-foreground)',
    'focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-inset is-checked:focus-visible:ring-(--segmented-foreground)',
    'is-disabled:cursor-not-allowed is-disabled:opacity-56',
  ]),
  variants: {},
});

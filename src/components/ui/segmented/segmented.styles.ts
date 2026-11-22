import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'inline-flex overflow-hidden border border-stroke-heavy bg-surface-soft [--segmented-rule:transparent]',
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent:
        '[--segmented-color:var(--color-surface-accent)] [--segmented-foreground:var(--color-foreground-on-accent)]',
      support:
        '[--segmented-color:var(--color-surface-support)] [--segmented-foreground:var(--color-foreground-on-support)]',
      // Quiet checked state for a setting that sits next to a stronger colour moment
      neutral:
        '[--segmented-color:var(--color-surface-muted)] [--segmented-foreground:var(--color-foreground)] [--segmented-rule:var(--color-foreground)]',
    },
  },
});

export const item = cva({
  base: cn([
    'text-[11px]/none inline-flex h-7 cursor-pointer items-center px-2.5 font-mono font-medium tracking-[0.04em] text-foreground-soft uppercase outline-hidden not-first:border-l not-first:border-stroke',
    'transition-colors duration-150 ease-out-quint not-is-checked:hover:text-foreground is-checked:bg-(--segmented-color) is-checked:text-(--segmented-foreground) is-checked:shadow-[inset_0_-2px_0_var(--segmented-rule)]',
    'focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-inset is-checked:focus-visible:ring-(--segmented-foreground)',
    'is-disabled:cursor-not-allowed is-disabled:opacity-56',
  ]),
  variants: {},
});

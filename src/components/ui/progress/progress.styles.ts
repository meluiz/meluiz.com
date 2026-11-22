import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'grid w-full min-w-0 grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-2',
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent: '[--progress-color:var(--color-surface-accent)]',
      support: '[--progress-color:var(--color-surface-support)]',
    },
  },
});

export const label = cva({
  base: 'col-start-1 min-w-0 truncate font-mono text-xs/4 font-medium text-foreground-soft',
  variants: {},
});

export const value = cva({
  base: 'col-start-2 font-mono text-xs/4 font-medium text-foreground-soft tabular-nums',
  variants: {},
});

export const track = cva({
  base: cn([
    'relative col-span-full h-1.5 w-full overflow-hidden',
    'before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:border-b before:border-stroke-heavy before:bg-[linear-gradient(to_right,var(--color-stroke-heavy)_1px,transparent_1px)] before:mask-[linear-gradient(to_right,transparent_1px,black_1px)] before:bg-size-[10%_100%]',
  ]),
  variants: {},
});

export const indicator = cva({
  base: cn([
    'relative z-1 h-full bg-(--progress-color) transition-[width] duration-300 ease-out motion-reduce:transition-none',
    'is-indeterminate:w-1/3 is-indeterminate:animate-progress-indeterminate motion-reduce:is-indeterminate:animate-none',
  ]),
  variants: {},
});

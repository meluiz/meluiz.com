import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'grid w-full min-w-0 grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-2 is-disabled:opacity-46',
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent: '[--slider-color:var(--color-surface-accent)]',
      support: '[--slider-color:var(--color-surface-support)]',
    },
  },
});

export const label = cva({
  base: 'col-start-1 font-mono text-label text-foreground-soft uppercase',
  variants: {},
});

export const value = cva({
  base: 'text-xs/none col-start-2 font-mono font-medium text-foreground tabular-nums',
  variants: {},
});

export const control = cva({
  base: 'col-span-full flex h-4 w-full cursor-pointer touch-none items-end select-none is-disabled:cursor-not-allowed',
  variants: {},
});

export const track = cva({
  base: cn([
    'relative h-1.5 w-full border-b border-stroke-heavy select-none',
    'before:absolute before:inset-x-0 before:-bottom-px before:h-1.5 before:bg-[linear-gradient(to_right,var(--color-stroke-heavy)_1px,transparent_1px)] before:bg-size-[10%_100%]',
    'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-3 after:border-r after:border-stroke-heavy has-data-[index=1]:after:border-l',
  ]),
  variants: {},
});

export const indicator = cva({
  base: 'bg-(--slider-color) select-none',
  variants: {},
});

export const thumb = cva({
  base: cn([
    'z-1 h-full w-3 cursor-pointer outline-hidden select-none is-disabled:cursor-not-allowed',
    'before:absolute before:-bottom-px before:left-1/2 before:h-4 before:w-0.5 before:-translate-x-1/2 before:bg-(--slider-color)',
    'has-focus-visible:before:ring-2 has-focus-visible:before:ring-(--slider-color) has-focus-visible:before:ring-offset-2 has-focus-visible:before:ring-offset-surface',
  ]),
  variants: {},
});

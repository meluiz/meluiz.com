import { cn, cva } from '@/utils/styles';

export const group = cva({
  base: 'flex flex-col items-start gap-2',
  variants: {},
});

export const root = cva({
  base: cn([
    'relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stroke-strong bg-surface-soft outline-hidden transition-colors duration-150',
    'is-checked:border-(--radio-color) is-checked:bg-(--radio-color)',
    'focus-visible:ring-2 focus-visible:ring-(--radio-color) focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-disabled:cursor-not-allowed is-disabled:opacity-46',
  ]),
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent: '[--radio-color:var(--color-surface-accent)]',
      support: '[--radio-color:var(--color-surface-support)]',
    },
  },
});

export const indicator = cva({
  base: cn([
    'size-1.5 scale-0 rounded-full bg-foreground-on-accent opacity-0',
    'is-checked:scale-100 is-checked:opacity-100 is-checked:transition-[scale,opacity] is-checked:delay-75 is-checked:duration-150 is-checked:ease-out',
    'motion-reduce:transition-none',
  ]),
  variants: {},
});

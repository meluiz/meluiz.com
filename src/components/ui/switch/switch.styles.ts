import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'group/switch relative inline-flex h-4.5 w-7.5 shrink-0 cursor-pointer items-center rounded-full border border-stroke-strong bg-surface-soft p-px outline-hidden transition-colors duration-150',
    'is-checked:border-(--switch-color) is-checked:bg-(--switch-color)',
    'focus-visible:ring-2 focus-visible:ring-(--switch-color) focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-disabled:cursor-not-allowed is-disabled:opacity-46',
  ]),
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent: '[--switch-color:var(--color-surface-accent)]',
      support: '[--switch-color:var(--color-surface-support)]',
    },
  },
});

export const thumb = cva({
  base: cn([
    'block h-3.5 w-3.5 rounded-full bg-stroke-strong transition-[width,translate,background-color] duration-200 ease-out',
    'is-checked:translate-x-3 is-checked:bg-surface-soft',
    'group-[:active:not([data-disabled])]/switch:w-4.5 group-[:active:not([data-disabled])]/switch:delay-100 group-[:active:not([data-disabled])]/switch:is-checked:translate-x-2',
    'motion-reduce:transition-none',
  ]),
  variants: {},
});

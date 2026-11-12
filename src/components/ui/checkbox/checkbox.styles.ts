import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center border border-stroke-strong bg-surface-soft text-foreground-on-accent outline-hidden transition-colors duration-150',
    'is-checked:border-(--checkbox-color) is-checked:bg-(--checkbox-color) is-indeterminate:border-(--checkbox-color) is-indeterminate:bg-(--checkbox-color)',
    'focus-visible:ring-2 focus-visible:ring-(--checkbox-color) focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-disabled:cursor-not-allowed is-disabled:opacity-46',
  ]),
  defaultVariants: {
    intent: 'accent',
  },
  variants: {
    intent: {
      accent: '[--checkbox-color:var(--color-surface-accent)]',
      support: '[--checkbox-color:var(--color-surface-support)]',
    },
  },
});

export const indicator = cva({
  base: 'group/checkbox-indicator absolute inset-0 flex items-center justify-center',
  variants: {},
});

export const checkIcon = cva({
  base: cn([
    'absolute size-4 **:[path]:[stroke-dasharray:13.68] **:[path]:[stroke-dashoffset:13.68]',
    'group-data-checked/checkbox-indicator:**:[path]:transition-[stroke-dashoffset] group-data-checked/checkbox-indicator:**:[path]:delay-75 group-data-checked/checkbox-indicator:**:[path]:duration-250 group-data-checked/checkbox-indicator:**:[path]:ease-out group-data-checked/checkbox-indicator:**:[path]:[stroke-dashoffset:0]',
    'group-data-indeterminate/checkbox-indicator:**:[path]:[stroke-dashoffset:13.68]',
    'motion-reduce:**:[path]:transition-none',
  ]),
  variants: {},
});

export const indeterminateIcon = cva({
  base: cn([
    'absolute size-4 scale-x-0',
    'group-data-indeterminate/checkbox-indicator:scale-x-100 group-data-indeterminate/checkbox-indicator:transition-transform group-data-indeterminate/checkbox-indicator:delay-75 group-data-indeterminate/checkbox-indicator:duration-150 group-data-indeterminate/checkbox-indicator:ease-out',
    'motion-reduce:transition-none',
  ]),
  variants: {},
});

import { cva } from '@/utils/styles';

export const root = cva({
  base: 'inline-flex center border border-stroke-heavy bg-surface-soft px-[calc(--spacing(1)-1px)] font-mono leading-none font-medium text-foreground-prose ledge transition-[translate,box-shadow] duration-100 ease-out-quint is-pressed:translate-y-px is-pressed:ledge-0',
  defaultVariants: {
    size: 'small',
  },
  variants: {
    size: {
      xsmall: 'h-3 min-w-3 text-xs **:[svg]:size-3.5',
      small: 'h-4 min-w-4 text-xs **:[svg]:size-4',
      medium: 'h-5 min-w-5 text-sm **:[svg]:size-4',
      large: 'h-6 min-w-6 px-[calc(--spacing(1.5)-1px)] text-sm **:[svg]:size-4.5',
    },
  },
});

import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'focus:not-is-invalid:border-stroke-heavy flex w-full min-w-0 border border-stroke-strong bg-surface-soft font-sans text-foreground outline-hidden placeholder:text-foreground-soft focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-readonly:cursor-not-allowed is-disabled:cursor-not-allowed is-disabled:caret-transparent is-disabled:opacity-46 is-disabled:select-none',
  ]),
  defaultVariants: {
    size: 'small',
    intent: 'accent',
  },
  variants: {
    size: {
      xsmall: 'text-xs/none h-6 gap-x-1.5 px-1.5 **:[svg]:size-3.5',
      small: 'text-sm/none h-7 gap-x-1.5 px-2 **:[svg]:size-4',
      medium: 'text-sm/none h-8 px-2.5 **:[svg]:size-4',
      large: 'text-sm/none h-9 px-3 **:[svg]:size-4.5',
      xlarge: 'text-base/none h-10 px-3.5 **:[svg]:size-5',
    },
    intent: {
      accent: 'focus-visible:ring-surface-accent',
      support: 'focus-visible:ring-surface-support',
    },
  },
});

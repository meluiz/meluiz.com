import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'block w-full min-w-0 resize-y border border-stroke-strong bg-surface-soft font-sans text-foreground outline-hidden placeholder:text-foreground-soft focus:not-is-invalid:border-stroke-heavy focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-readonly:cursor-text is-disabled:cursor-not-allowed is-disabled:caret-transparent is-disabled:opacity-46 is-disabled:select-none',
    'autofill:caret-foreground autofill:shadow-[inset_0_0_0_1000px_var(--color-surface-soft)] autofill:[-webkit-text-fill-color:var(--color-foreground)]',
    'data-com-onepassword-filled:bg-surface-soft data-com-onepassword-filled:shadow-[inset_0_0_0_1000px_var(--color-surface-soft)]',
  ]),
  defaultVariants: {
    size: 'small',
    intent: 'accent',
    compact: false,
    autoresize: false,
  },
  variants: {
    size: {
      xsmall: 'min-h-16 px-1.5 py-1 text-xs/snug',
      small: 'min-h-18 px-2 py-1.5 text-sm/snug',
      medium: 'min-h-20 px-2.5 py-2 text-sm/snug',
      large: 'min-h-22 px-3 py-2.5 text-sm/snug',
      xlarge: 'min-h-24 px-3.5 py-3 text-base/snug',
    },
    intent: {
      accent: 'focus-visible:ring-surface-accent',
      support: 'focus-visible:ring-surface-support',
    },
    autoresize: {
      true: 'field-sizing-content resize-none',
    },
    compact: {
      true: '',
    },
  },
  compoundVariants: [
    {
      className: 'min-h-6 py-0.75 text-xs/4',
      variants: {
        size: 'xsmall',
        compact: true,
      },
    },
    {
      className: 'min-h-7 py-0.75 text-sm/5',
      variants: {
        size: 'small',
        compact: true,
      },
    },
    {
      className: 'min-h-8 py-1.25 text-sm/5',
      variants: {
        size: 'medium',
        compact: true,
      },
    },
    {
      className: 'min-h-9 py-1.75 text-sm/5',
      variants: {
        size: 'large',
        compact: true,
      },
    },
    {
      className: 'min-h-10 py-1.75 text-base/6',
      variants: {
        size: 'xlarge',
        compact: true,
      },
    },
  ],
});

import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'group/button relative inline-flex cursor-pointer center gap-x-2 rounded-none border border-transparent bg-clip-padding font-sans text-sm font-medium whitespace-nowrap text-foreground tabular-nums outline-hidden transition focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
    'is-disabled:pointer-events-none is-disabled:cursor-not-allowed is-disabled:opacity-56 is-disabled:select-none',
    "**:[span]:truncate **:[svg]:-mx-0.5 *:[svg:not([class*='opacity-'])]:opacity-80",
  ]),
  defaultVariants: {
    size: 'small',
    compact: false,
    variant: 'solid',
    intent: 'accent',
  },
  variants: {
    size: {
      xsmall:
        'h-6 gap-x-1.5 px-[calc(--spacing(2)-1px)] text-xs active:scale-98 **:[svg]:size-3.5',
      small:
        'h-7 gap-x-1.5 px-[calc(--spacing(2.5)-1px)] text-sm active:scale-[98.5%] **:[svg]:size-4',
      medium: 'h-8 px-[calc(--spacing(3)-1px)] text-sm active:scale-99 **:[svg]:size-4',
      large: 'h-9 px-[calc(--spacing(3.5)-1px)] text-sm active:scale-99 **:[svg]:size-4.5',
      xlarge: 'h-10 px-[calc(--spacing(4)-1px)] text-base active:scale-[99.5%] **:[svg]:size-5',
    },
    compact: {
      true: 'aspect-square px-0',
    },
    variant: {
      solid: 'hatch-1.5 hover:bg-hatch',
      outline: 'border-stroke bg-surface hover:border-stroke-strong',
      soft: 'hover:bg-surface-contrast/8 bg-surface-muted text-foreground-prose',
      ghost: 'bg-transparent text-foreground-soft hover:bg-surface-muted',
      link: 'h-auto px-0 text-foreground underline decoration-stroke-strong underline-offset-4',
    },
    intent: {
      accent: 'focus-visible:ring-surface-accent',
      support: 'focus-visible:ring-surface-support',
    },
  },
  compoundVariants: [
    {
      className: 'text-foreground-on-accent hatch-foreground-on-accent/10 bg-surface-accent',
      variants: {
        variant: 'solid',
        intent: 'accent',
      },
    },
    {
      className: 'text-foreground-on-support hatch-foreground-on-support/10 bg-surface-support',
      variants: {
        variant: 'solid',
        intent: 'support',
      },
    },
    {
      className: 'hover:text-foreground-accent hover:decoration-foreground-accent',
      variants: {
        variant: 'link',
        intent: 'accent',
      },
    },
    {
      className: 'hover:text-foreground-support hover:decoration-foreground-support',
      variants: {
        variant: 'link',
        intent: 'support',
      },
    },
    {
      className: 'active:scale-97',
      variants: {
        size: ['xsmall', 'small'],
        compact: true,
      },
    },
    {
      className: 'active:scale-98',
      variants: {
        size: ['medium', 'large'],
        compact: true,
      },
    },
    {
      className: 'active:scale-99',
      variants: {
        size: 'xlarge',
        compact: true,
      },
    },
  ],
});

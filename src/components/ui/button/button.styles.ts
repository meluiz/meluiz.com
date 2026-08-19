import { tv } from 'tailwind-variants';

export const root = tv({
  base: [
    'relative inline-flex isolate center gap-x-2 whitespace-nowrap border cursor-pointer shrink-0 grow-0 rounded-sm text-base font-medium outline-none transition-[box-shadow,background-color,scale] duration-150 ease-out-quint disabled:pointer-events-none disabled:opacity-64 sm:text-sm',
    "**:[svg]:-mx-0.5 **:[svg]:pointer-events-none **:[svg]:shrink-0 **:[svg:not([class*='opacity-'])]:opacity-80 **:[svg]:size-4 sm:**:[svg]:size-3.5",
  ],
  defaultVariants: {
    size: 'medium',
    compact: false,
    variant: 'soft',
  },
  variants: {
    size: {
      xsmall: [
        'h-7 sm:h-6 gap-2 px-[calc(--spacing(2)-1px)] text-sm sm:text-xs',
        '**:[svg]:size-3-5 sm:**:[svg]:size-3',
      ],
      small: 'h-8 sm:h-7 gap-2 px-[calc(--spacing(2.5)-1px)]',
      medium: 'h-9 sm:h-8 px-[calc(--spacing(3)-1px)]',
      large: 'h-10 sm:h-9 px-[calc(--spacing(3.5)-1px)]',
      xlarge: [
        'h-11 sm:h-10 px-[calc(--spacing(4)-1px)] text-lg sm:text-base',
        '**:[svg]:size-4.5 sm:**:[svg]:size-4',
      ],
    },
    compact: {
      true: '',
    },
    variant: {
      link: 'border-transparent underline-offset-4 hover:underline active:underline',
      soft: 'border-transparent bg-surface-muted text-foreground-muted active:bg-surface-muted/80 hover:bg-surface-muted/90',
      ghost:
        'border-transparent text-foreground hover:bg-surface-muted active:bg-surface-muted checked:bg-surface-muted',
    },
  },
  compoundVariants: [
    {
      compact: true,
      size: 'xsmall',
      className: 'size-7 sm:size-6',
    },
    {
      compact: true,
      size: 'small',
      className: 'size-8 sm:size-7',
    },
    {
      compact: true,
      size: 'medium',
      className: 'size-9 sm:size-8',
    },
    {
      compact: true,
      size: 'large',
      className: ['size-11 sm:size-10', '**:[svg]:size-4.5 sm:**:[svg]:size-4'],
    },
    {
      compact: true,
      size: 'xlarge',
      className: ['size-11 sm:size-10', '**:[svg]:size-4.5 sm:**:[svg]:size-4'],
    },
  ],
});

export const label = tv({
  base: 'truncate uppercase font-medium font-mono',
});

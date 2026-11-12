import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'flex w-full min-w-0 flex-col gap-1.5',
  variants: {},
});

export const scrubArea = cva({
  base: 'flex cursor-ew-resize self-start select-none *:cursor-ew-resize',
  variants: {},
});

export const scrubAreaCursor = cva({
  base: 'drop-shadow-[0_1px_1px_#0008] *:[svg]:size-6',
  variants: {},
});

export const group = cva({
  base: cn([
    'flex w-full min-w-0 items-stretch border border-stroke-strong bg-surface-soft font-sans text-foreground focus-within:not-is-invalid:border-stroke-heavy has-focus-visible:ring-2 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-surface',
    'is-invalid:border-foreground-accent is-disabled:cursor-not-allowed is-disabled:opacity-46 is-disabled:select-none',
  ]),
  defaultVariants: {
    size: 'small',
    intent: 'accent',
    placement: 'end',
  },
  variants: {
    size: {
      xsmall:
        'text-xs/none h-6 **:[[data-scope=number-field][data-part=input]]:px-1.5 **:[svg]:size-3.5',
      small:
        'text-sm/none h-7 **:[[data-scope=number-field][data-part=input]]:px-2 **:[svg]:size-4',
      medium:
        'text-sm/none h-8 **:[[data-scope=number-field][data-part=input]]:px-2.5 **:[svg]:size-4',
      large:
        'text-sm/none h-9 **:[[data-scope=number-field][data-part=input]]:px-3 **:[svg]:size-4.5',
      xlarge:
        'text-base/none h-10 **:[[data-scope=number-field][data-part=input]]:px-3.5 **:[svg]:size-5',
    },
    intent: {
      accent: 'has-focus-visible:ring-surface-accent',
      support: 'has-focus-visible:ring-surface-support',
    },
    placement: {
      start: cn([
        '**:[[data-scope=number-field][data-part=decrement]]:order-first **:[[data-scope=number-field][data-part=decrement]]:border-r **:[[data-scope=number-field][data-part=decrement]]:border-l-0',
        '**:[[data-scope=number-field][data-part=increment]]:order-first **:[[data-scope=number-field][data-part=increment]]:border-r **:[[data-scope=number-field][data-part=increment]]:border-l-0',
      ]),
      end: '',
      between: cn([
        '**:[[data-scope=number-field][data-part=input]]:text-center',
        '**:[[data-scope=number-field][data-part=decrement]]:order-first **:[[data-scope=number-field][data-part=decrement]]:border-r **:[[data-scope=number-field][data-part=decrement]]:border-l-0',
      ]),
    },
  },
});

export const input = cva({
  base: cn([
    'min-w-0 flex-1 bg-transparent text-foreground tabular-nums outline-hidden placeholder:text-foreground-soft',
    'is-readonly:cursor-text is-disabled:cursor-not-allowed is-disabled:caret-transparent',
  ]),
  variants: {},
});

const button = cn([
  'flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center border-l border-stroke-strong text-foreground outline-hidden select-none',
  'hover:bg-surface-muted active:bg-surface-muted is-disabled:cursor-not-allowed is-disabled:text-stroke-strong is-disabled:hover:bg-transparent',
]);

export const decrement = cva({
  base: button,
  variants: {},
});

export const increment = cva({
  base: button,
  variants: {},
});

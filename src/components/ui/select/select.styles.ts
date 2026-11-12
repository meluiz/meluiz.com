import { cn, cva } from '@/utils/styles';

import { input as inputStyles } from '../input';

export const trigger = cva({
  composes: [inputStyles.root],
  base: 'cursor-pointer items-center justify-between text-left transition-[border-color] delay-150 duration-0 select-none focus:delay-0 is-open:border-stroke-heavy is-open:delay-0',
  variants: {},
});

export const value = cva({
  base: 'min-w-0 truncate data-placeholder:text-foreground-soft',
  variants: {},
});

export const icon = cva({
  base: 'flex shrink-0 text-foreground-soft transition-transform duration-150 is-open:rotate-180',
  variants: {},
});

export const positioner = cva({
  base: 'z-50 outline-hidden',
  variants: {},
});

export const popup = cva({
  base: cn([
    'relative flex max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) flex-col border border-stroke-strong bg-surface text-foreground outline-hidden',
    'transition-[opacity,scale] duration-100 ease-out data-[side=none]:transition-none is-starting:scale-98 is-starting:opacity-0 is-ending:scale-98 is-ending:opacity-0',
  ]),
  defaultVariants: {
    size: 'small',
  },
  variants: {
    size: {
      xsmall:
        '**:[[data-scope=select][data-part=item]]:text-xs/none **:[[data-scope=select][data-part=group-label]]:px-1.5 **:[[data-scope=select][data-part=item]]:h-6 **:[[data-scope=select][data-part=item]]:px-1.5',
      small:
        '**:[[data-scope=select][data-part=item]]:text-sm/none **:[[data-scope=select][data-part=group-label]]:px-2 **:[[data-scope=select][data-part=item]]:h-7 **:[[data-scope=select][data-part=item]]:px-2',
      medium:
        '**:[[data-scope=select][data-part=item]]:text-sm/none **:[[data-scope=select][data-part=group-label]]:px-2.5 **:[[data-scope=select][data-part=item]]:h-8 **:[[data-scope=select][data-part=item]]:px-2.5',
      large:
        '**:[[data-scope=select][data-part=item]]:text-sm/none **:[[data-scope=select][data-part=group-label]]:px-3 **:[[data-scope=select][data-part=item]]:h-9 **:[[data-scope=select][data-part=item]]:px-3',
      xlarge:
        '**:[[data-scope=select][data-part=item]]:text-base/none **:[[data-scope=select][data-part=group-label]]:px-3.5 **:[[data-scope=select][data-part=item]]:h-10 **:[[data-scope=select][data-part=item]]:px-3.5',
    },
  },
});

const scrollArrow = cn([
  'absolute inset-x-0 z-1 flex min-h-4 w-full cursor-default items-center justify-center bg-surface text-foreground-soft',
  "before:absolute before:inset-x-0 before:h-full before:content-['']",
]);

export const scrollUpArrow = cva({
  base: cn([scrollArrow, 'top-0 border-b py-0.5 before:-top-full *:[svg]:size-4.5']),
  variants: {},
});

export const scrollDownArrow = cva({
  base: cn([scrollArrow, 'bottom-0 border-t py-0.5 before:-bottom-full *:[svg]:size-4.5']),
  variants: {},
});

export const scrollArea = cva({
  base: 'min-h-0 flex-1',
  variants: {},
});

export const list = cva({
  base: 'relative min-h-0 flex-1 py-1',
  defaultVariants: {
    scrollMode: 'scrollbar',
  },
  variants: {
    scrollMode: {
      arrows: 'scroll-py-4 overflow-y-auto',
      scrollbar: '',
    },
  },
});

export const item = cva({
  base: cn([
    'flex cursor-pointer items-center justify-between gap-3 font-sans text-foreground-soft outline-hidden select-none',
    'is-highlighted:bg-surface-muted is-highlighted:text-foreground is-selected:font-medium is-selected:text-foreground',
    'is-disabled:cursor-not-allowed is-disabled:opacity-46',
  ]),
  variants: {},
});

export const itemText = cva({
  base: 'min-w-0 truncate',
  variants: {},
});

export const itemIndicator = cva({
  base: 'text-xs/none brackets shrink-0 font-mono font-normal text-foreground-accent',
  variants: {},
});

export const group = cva({
  base: 'py-1',
  variants: {},
});

export const groupLabel = cva({
  base: 'font-mono text-label text-foreground-muted uppercase',
  variants: {},
});

export const separator = cva({
  base: 'my-1 h-px bg-stroke',
  variants: {},
});

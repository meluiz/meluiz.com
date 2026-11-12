import { cn, cva } from '@/utils/styles';

export const trigger = cva({
  base: '',
  variants: {},
});

export const positioner = cva({
  base: 'z-50 outline-hidden',
  variants: {},
});

export const popup = cva({
  base: cn([
    'relative flex max-h-(--available-height) min-w-48 origin-(--transform-origin) flex-col overflow-y-auto border border-stroke-strong bg-surface p-1 text-foreground shadow-[0_4px_16px_rgb(0_0_0/0.06)] outline-hidden',
    'transition-[opacity,scale] duration-100 ease-out is-starting:scale-98 is-starting:opacity-0 is-ending:scale-98 is-ending:opacity-0',
  ]),
  variants: {},
});

const itemBase = cn([
  'text-sm/none flex h-8 cursor-pointer items-center gap-2.5 px-2 font-sans font-medium text-foreground-soft outline-hidden select-none',
  '*:[svg]:size-4 *:[svg]:shrink-0 *:[svg]:text-foreground-soft',
  'is-highlighted:bg-surface-muted is-highlighted:text-foreground is-highlighted:*:[svg]:text-foreground-accent',
  'is-disabled:cursor-not-allowed is-disabled:text-foreground-muted is-disabled:*:[svg]:text-foreground-muted',
]);

const tone = {
  default: '',
  accent:
    'text-foreground-accent *:[svg]:text-foreground-accent is-highlighted:text-foreground-accent',
};

export const item = cva({
  base: itemBase,
  defaultVariants: {
    tone: 'default',
  },
  variants: {
    tone,
  },
});

export const linkItem = cva({
  base: itemBase,
  defaultVariants: {
    tone: 'default',
  },
  variants: {
    tone,
  },
});

export const submenuTrigger = cva({
  base: cn([itemBase, 'is-open:bg-surface-muted is-open:text-foreground']),
  variants: {},
});

export const shortcut = cva({
  base: 'text-xs/none ms-auto ps-4 font-mono text-foreground-muted *:[svg]:size-3.5',
  variants: {},
});

export const group = cva({
  base: 'flex flex-col',
  variants: {},
});

export const groupLabel = cva({
  base: 'px-2 pt-2.5 pb-1.5 font-mono text-label text-foreground-muted uppercase',
  variants: {},
});

export const separator = cva({
  base: '-mx-1 my-1 h-px bg-stroke',
  variants: {},
});

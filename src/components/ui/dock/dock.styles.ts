import { cn, cva } from '@/utils/styles';

export const positioner = cva({
  base: 'pointer-events-none fixed inset-x-0 bottom-4.5 z-50 flex min-h-0 center overflow-clip px-3',
  variants: {},
});

export const root = cva({
  base: cn([
    'pointer-events-auto relative flex max-w-full flex-col border border-stroke bg-surface-soft p-1 text-foreground',
    'shadow-[inset_0_1px_0_var(--color-white),inset_0_-1px_0_color-mix(in_oklab,var(--color-silt-950)_5%,transparent)]',
    'dark:shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-silt-50)_8%,transparent),inset_0_-1px_0_color-mix(in_oklab,var(--color-silt-950)_48%,transparent)]',
  ]),
  variants: {},
});

export const list = cva({
  base: 'flex min-w-0 center-start gap-0.5 outline-hidden vertical:flex-col vertical:stretch-start',
  variants: {},
});

export const item = cva({
  base: 'flex shrink-0 center',
  variants: {},
});

export const separator = cva({
  base: 'shrink-0 self-stretch bg-stroke horizontal:h-px vertical:mx-1 vertical:w-px',
  variants: {},
});

export const trigger = cva({
  base: 'cursor-pointer',
  variants: {},
});

export const panel = cva({
  base: 'flex min-w-0 center-start gap-0.5 outline-hidden vertical:flex-col vertical:stretch-start',
  variants: {},
});

export const close = cva({
  base: 'cursor-pointer',
  variants: {},
});

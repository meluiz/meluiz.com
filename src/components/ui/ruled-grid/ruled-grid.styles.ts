import { cva } from '@/utils/styles';

export const root = cva({
  base: 'grid min-h-0 gap-px bg-stroke-soft',
  variants: {},
});

export const cell = cva({
  base: 'flex min-h-0 flex-col gap-y-1 bg-surface',
  defaultVariants: {
    inset: 'medium',
    stretch: false,
    interactive: false,
  },
  variants: {
    inset: {
      none: '',
      medium: 'px-3 py-4',
    },
    stretch: {
      true: 'col-span-full',
    },
    interactive: {
      true: 'hover:bg-surface/80 motion-safe:transition-colors motion-safe:duration-200',
    },
  },
});

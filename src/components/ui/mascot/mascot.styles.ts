import { cva } from '@/utils/styles';

export const root = cva({
  base: 'block',
  defaultVariants: {
    animation: 'none',
  },
  variants: {
    animation: {
      none: '',
      wobble: 'motion-safe:animate-mascot-wobble origin-bottom',
    },
  },
});

export const body = cva({
  base: 'fill-surface-brand',
  variants: {},
});

export const group = cva({
  base: 'translate-x-(--mascot-look-x) translate-y-(--mascot-look-y) transition-[translate] duration-300 ease-(--ease-standard) motion-reduce:transition-none',
  defaultVariants: {
    animation: 'none',
  },
  variants: {
    animation: {
      none: '',
      look: 'motion-safe:animate-mascot-look',
    },
  },
});

export const eye = cva({
  base: 'origin-center fill-foreground-on-brand transform-fill motion-safe:in-data-blink:animate-blink',
  variants: {},
});

export const mark = cva({
  base: 'fill-none stroke-foreground-on-brand',
  variants: {},
});

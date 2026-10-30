import { cva } from '@/utils/styles';

export const root = cva({
  base: 'block',
  variants: {},
});

export const body = cva({
  base: 'fill-surface-brand',
  variants: {},
});

export const group = cva({
  base: 'translate-x-(--mascot-look-x) translate-y-(--mascot-look-y) transition-[translate] duration-300 ease-(--ease-standard) motion-reduce:transition-none',
  variants: {},
});

export const eye = cva({
  base: 'motion-safe:in-data-blink:animate-blink origin-center fill-foreground-on-brand transform-fill',
  variants: {},
});

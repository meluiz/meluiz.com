import { tv } from 'tailwind-variants';

export const root = tv({
  base: ['shrink-0 bg-stroke'],
  defaultVariants: {
    lighten: false,
    orientation: 'horizontal',
  },
  variants: {
    orientation: {
      horizontal: ['h-px w-full'],
      vertical: ["w-px not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch"],
    },
    lighten: {
      true: ['bg-stroke-soft'],
      false: ['bg-stroke'],
    },
  },
});

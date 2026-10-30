import { cva } from '@/utils/styles';

export const root = cva({
  base: 'shrink-0 border-0 horizontal:h-px horizontal:w-full vertical:min-h-4 vertical:w-px vertical:self-stretch',
  defaultVariants: {
    strength: 'soft',
  },
  variants: {
    strength: {
      soft: 'bg-stroke-soft',
      medium: 'bg-stroke',
      strong: 'bg-stroke-strong',
    },
  },
});

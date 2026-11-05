import { sva } from '@/utils/styles';

export const stats = sva({
  variants: {},
  slots: ['root', 'list', 'item'],
  base: {
    root: 'grid-cols-2 bg-stroke sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none',
    list: 'horizontal:gap-px vertical:gap-px',
    item: 'max-sm:odd:last:col-span-full',
  },
});

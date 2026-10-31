import { sva } from '@/utils/styles';

export const serverError = sva({
  variants: {},
  slots: ['root', 'intro'],
  base: {
    root: 'container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft md:border-x',
    intro: 'relative',
  },
});

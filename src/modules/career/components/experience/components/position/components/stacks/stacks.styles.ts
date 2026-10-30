import { sva } from '@/utils/styles';

export const stacks = sva({
  variants: {},
  slots: ['root'],
  base: {
    root: 'flex flex-wrap gap-x-1.5 gap-y-1',
  },
});

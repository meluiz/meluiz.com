import { sva } from '@/utils/styles';

export const links = sva({
  variants: {},
  slots: ['root'],
  base: {
    root: 'flex shrink-0 center-end gap-x-1.5',
  },
});

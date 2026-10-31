import { sva } from '@/utils/styles';

export const report = sva({
  variants: {},
  slots: ['header', 'title', 'wide'],
  base: {
    header: 'sm:flex-row sm:center-between sm:px-6',
    title: 'text-foreground',
    wide: 'col-span-2',
  },
});

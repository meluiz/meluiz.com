import { sva } from '@/utils/styles';

export const report = sva({
  variants: {},
  slots: ['header', 'title', 'wide', 'value'],
  base: {
    header: 'sm:flex-row sm:center-between sm:px-6',
    title: 'text-foreground',
    wide: 'col-span-2',
    value:
      'truncate font-medium text-foreground-prose **:[mark]:bg-transparent **:[mark]:text-foreground-accent',
  },
});

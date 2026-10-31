import { sva } from '@/utils/styles';

export const project = sva({
  variants: {},
  slots: ['root', 'header', 'heading', 'title', 'description'],
  base: {
    root: 'flex flex-col gap-y-3 px-3 py-4',
    header: 'flex flex-col gap-y-1',
    heading: 'flex center-between gap-x-3',
    title: 'font-mono text-sm font-medium text-foreground',
    description: 'line-clamp-2 font-sans text-sm text-foreground-soft',
  },
});

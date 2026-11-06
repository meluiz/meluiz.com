import { sva } from '@/utils/styles';

export const socialChannels = sva({
  variants: {},
  slots: ['root', 'item', 'link', 'name', 'handle'],
  base: {
    root: 'grid grid-cols-1 border-t border-current/20 sm:grid-cols-3',
    item: 'border-current/20 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0',
    link: 'flex center-between gap-x-3 px-4 py-4 -outline-offset-4 hover:bg-current/8 focus-visible:outline-current sm:px-6',
    name: 'font-mono text-label uppercase',
    handle: 'font-mono text-sm',
  },
});

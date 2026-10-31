import { sva } from '@/utils/styles';

export const colophon = sva({
  variants: {},
  slots: ['header', 'title', 'body', 'list', 'inspirations'],
  base: {
    header: 'sm:flex-row sm:center-between sm:px-6',
    title: 'font-mono text-sm font-medium text-foreground',
    body: 'divide-y divide-stroke',
    list: 'flex flex-col gap-y-px',
    inspirations:
      'grid list-inside list-decimal grid-flow-row grid-cols-1 gap-x-px gap-y-0.5 marker:font-mono marker:text-sm marker:text-foreground-soft sm:grid-flow-col sm:grid-cols-none sm:grid-rows-2',
  },
});

import { sva } from '@/utils/styles';

export const achievements = sva({
  variants: {},
  slots: ['root', 'item', 'label', 'separator', 'description'],
  base: {
    root: 'flex flex-col gap-y-3',
    item: 'flex flex-col gap-y-1',
    label: 'text-label font-mono text-foreground-accent uppercase',
    separator: 'text-foreground',
    description: 'text-body max-w-[64ch] font-sans text-foreground-prose',
  },
});

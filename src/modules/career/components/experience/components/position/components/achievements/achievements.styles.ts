import { sva } from '@/utils/styles';

export const achievements = sva({
  variants: {},
  slots: ['root', 'item', 'label', 'separator', 'description'],
  base: {
    root: 'flex flex-col gap-y-3',
    item: 'flex flex-col gap-y-1',
    label: 'font-mono text-label text-foreground-accent uppercase',
    separator: 'text-foreground',
    description: 'max-w-[64ch] font-sans text-body text-foreground-prose',
  },
});

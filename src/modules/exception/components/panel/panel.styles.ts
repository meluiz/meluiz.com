import { sva } from '@/utils/styles';

export const panel = sva({
  variants: {},
  slots: ['root', 'panel', 'header', 'heading'],
  base: {
    root: 'overflow-hidden bg-surface bg-hatch px-6 hatch-2 hatch-stroke sm:px-8',
    panel: 'flex flex-col border-x border-stroke-soft bg-surface text-foreground',
    header: 'flex-row start-between gap-x-4',
    heading: 'flex min-w-0 flex-col gap-y-1',
  },
});

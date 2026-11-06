import { sva } from '@/utils/styles';

export const projects = sva({
  variants: {},
  slots: ['root', 'panel', 'list', 'item', 'more', 'moreTitle', 'moreUrl'],
  base: {
    root: 'overflow-hidden border-hidden bg-surface bg-hatch px-6 text-foreground-on-brand hatch-2 hatch-stroke sm:px-8',
    panel: 'flex flex-col border-x border-stroke-soft bg-surface text-foreground',
    list: 'grid grid-cols-1 gap-px bg-stroke-soft sm:grid-cols-2',
    item: 'bg-surface',
    more: 'flex size-full flex-col center bg-surface px-3 py-4 hover:bg-surface/64 max-sm:hover:underline',
    moreTitle: 'font-mono text-value text-foreground-prose uppercase',
    moreUrl: 'font-sans text-sm font-medium text-foreground-soft max-sm:hidden',
  },
});

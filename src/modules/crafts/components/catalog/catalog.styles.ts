import { sva } from '@/utils/styles';

export const filter = sva({
  variants: {},
  slots: ['root', 'group', 'label', 'list', 'item', 'remove', 'count'],
  base: {
    root: 'flex min-h-14 flex-row center-between gap-x-3 px-4 sm:px-6',
    group: 'flex center gap-x-3',
    label: 'py-3.5 text-sm/snug font-medium text-foreground-soft',
    list: 'flex flex-wrap center gap-x-1.5',
    item: 'flex min-h-6 center gap-x-2 bg-surface-accent px-2 font-mono text-xs/4 text-foreground-accent uppercase ring ring-foreground-accent',
    remove: '-mx-px',
    count:
      'shrink-0 font-mono text-xs/4 font-medium tracking-tighter text-foreground-muted uppercase',
  },
});

export const card = sva({
  variants: {},
  slots: [
    'root',
    'stage',
    'serial',
    'meta',
    'top',
    'title',
    'link',
    'date',
    'description',
    'tags',
    'tag',
  ],
  base: {
    root: 'relative min-w-0 gap-y-0',
    stage:
      'z-1 border-b border-stroke-soft *:data-[part=root]:aspect-16/10 sm:*:data-[part=root]:aspect-4/3',
    serial:
      'pointer-events-none absolute top-2.5 left-3 font-mono text-xs/4 font-medium tracking-wide text-foreground-muted',
    meta: 'flex flex-col gap-y-1.5 px-4 pt-3 pb-3.5 sm:pt-3.5 sm:pb-4',
    top: 'flex items-baseline justify-between gap-x-3',
    title: 'min-w-0 font-mono text-sm/5 font-medium text-foreground',
    link: 'after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-accent',
    date: 'shrink-0 font-mono text-xs/4 text-foreground-soft',
    description: 'line-clamp-3 text-sm/normal text-pretty text-foreground-soft',
    tags: 'mt-1 flex flex-wrap gap-1',
    tag: 'relative z-2 transition-colors duration-150 ease-in-out-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-accent data-[tone=accent]:border-foreground-accent data-[tone=accent]:bg-surface-accent data-[tone=accent]:hover:text-foreground-accent',
  },
});

export const results = sva({
  variants: {},
  slots: ['root', 'filler', 'empty'],
  base: {
    root: 'grid-cols-1 sm:grid-cols-2',
    filler:
      'min-h-50 center px-4 py-8 text-center font-mono text-xs/4.5 font-medium tracking-wide text-foreground-muted uppercase max-sm:hidden',
    empty:
      'flex min-h-50 center px-4 py-8 text-center font-mono text-xs/4.5 font-medium tracking-wide text-foreground-muted uppercase',
  },
});

import { sva } from '@/utils/styles';

export const topbar = sva({
  variants: {},
  slots: ['root', 'back', 'label'],
  base: {
    root: 'flex min-h-14 center-between gap-3 px-4 sm:px-6',
    back: 'gap-x-2 font-mono uppercase',
    label: 'font-mono text-xs font-medium tracking-tighter text-foreground-muted uppercase',
  },
});

export const header = sva({
  variants: {},
  slots: [
    'root',
    'status',
    'statusTag',
    'statusDate',
    'content',
    'title',
    'description',
    'tagsGroup',
  ],
  base: {
    root: 'relative flex min-h-0 w-full flex-col gap-y-3.5 px-4 pt-9 pb-10 sm:px-6',
    status: 'inline-flex center-start gap-x-2',
    statusTag: 'tracking-normal uppercase',
    statusDate:
      'font-mono text-xs font-medium tracking-tighter text-foreground-muted uppercase',
    content: 'flex flex-col gap-y-1.5',
    title:
      'font-sans text-3xl leading-none font-medium tracking-tight text-balance text-foreground sm:text-4xl',
    description: 'max-w-[48ch] text-base/relaxed text-pretty text-foreground-prose',
    tagsGroup: 'flex flex-wrap gap-2',
  },
});

export const specs = sva({
  variants: {},
  slots: ['root', 'list', 'item'],
  base: {
    root: 'grid-cols-2 ring ring-stroke-soft sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none',
    list: 'horizontal:gap-px vertical:gap-px',
    item: 'max-sm:odd:last:col-span-full',
  },
});

export const pager = sva({
  variants: {},
  slots: ['root', 'trigger', 'label', 'title'],
  base: {
    root: 'grid grid-cols-2 gap-px bg-stroke-soft bg-clip-padding',
    trigger:
      'group flex min-w-0 flex-col items-start gap-1 bg-surface px-4 py-3.5 transition-colors duration-150 ease-in-out-base only:col-span-full hover:bg-surface-soft sm:px-6 [[rel=next]]:items-end [[rel=prev]]:items-start',
    label:
      'inline-flex items-center gap-x-2 font-mono text-xs/4 font-medium tracking-wider text-foreground-muted uppercase *:[svg]:size-3.5 *:[svg]:transition-transform *:[svg]:duration-150 *:[svg]:ease-in-out-base group-hover:*:[svg]:in-[[rel=next]]:translate-x-1 group-hover:*:[svg]:in-[[rel=prev]]:-translate-x-1',
    title: 'max-w-full truncate font-mono text-sm/5 font-medium text-foreground',
  },
});

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
    description: 'text-sm/normal text-pretty text-foreground-soft',
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

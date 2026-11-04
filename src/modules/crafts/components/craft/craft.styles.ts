import { sva } from '@/utils/styles';

export const topbar = sva({
  variants: {},
  slots: ['root', 'label'],
  base: {
    root: 'flex min-h-14 center-between gap-3 px-4 sm:px-6',
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

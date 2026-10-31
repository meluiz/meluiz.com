import { sva } from '@/utils/styles';

export const errorDetails = sva({
  variants: {},
  slots: [
    'summary',
    'name',
    'message',
    'frames',
    'frame',
    'index',
    'at',
    'function',
    'location',
  ],
  base: {
    summary:
      'border-b border-stroke-soft bg-surface-accent px-3 py-4 font-mono text-sm wrap-break-word sm:px-6',
    name: 'text-foreground-accent',
    message: 'text-foreground',
    frames: 'flex flex-col py-2 font-mono text-sm',
    frame:
      'group flex min-w-0 baseline-start gap-x-2 px-3 py-1.5 sm:px-6 is-highlighted:bg-surface-muted',
    index: 'w-5 shrink-0 text-right text-foreground-soft tabular-nums',
    at: 'shrink-0 text-foreground-soft',
    function: 'shrink-0 text-foreground',
    location: 'truncate text-foreground-soft group-data-internal:text-foreground-soft/56',
  },
});

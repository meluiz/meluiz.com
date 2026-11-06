import { sva } from '@/utils/styles';

export const position = sva({
  variants: {},
  slots: ['period', 'current', 'content', 'header', 'title', 'summary'],
  base: {
    period: 'font-mono text-xs text-foreground-soft tabular-nums',
    current: 'brackets font-mono text-label text-foreground-accent uppercase',
    content: 'flex min-w-0 flex-col gap-y-4',
    header: 'flex flex-col gap-y-1',
    title: 'font-sans text-body-strong text-foreground',
    summary: 'max-w-[64ch] font-sans text-body text-foreground-prose',
  },
});

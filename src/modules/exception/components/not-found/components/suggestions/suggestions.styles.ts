import { sva } from '@/utils/styles';

export const suggestions = sva({
  variants: {},
  slots: ['list', 'link', 'index', 'label', 'hint', 'icon'],
  base: {
    list: 'flex flex-col divide-y divide-stroke-soft',
    link: 'group grid grid-cols-[2rem_1fr_auto] center-start gap-x-3 bg-surface px-3 py-4 -outline-offset-4 hover:bg-surface-muted/56 sm:grid-cols-[2.5rem_1fr_auto_auto] sm:px-6',
    index: 'font-mono text-label text-foreground-soft tabular-nums',
    label: 'font-mono text-value text-foreground',
    hint: 'font-mono text-xs text-foreground-soft max-sm:hidden',
    icon: 'size-4 text-foreground-soft motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1',
  },
});

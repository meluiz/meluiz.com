import { sva } from '@/utils/styles';

export const entry = sva({
  variants: {},
  slots: ['label', 'value'],
  base: {
    label: 'text-xs font-medium text-foreground-soft uppercase',
    value: 'font-mono text-sm font-medium tracking-tight text-foreground-prose',
  },
});

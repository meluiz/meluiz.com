import { sva } from '@/utils/styles';

export const entry = sva({
  variants: {},
  slots: ['label', 'value'],
  base: {
    label: 'text-xs font-medium text-foreground-soft uppercase',
    value:
      'truncate font-mono text-sm font-medium tracking-tight text-foreground-prose **:[mark]:bg-transparent **:[mark]:text-foreground-accent',
  },
});

import { cva } from '@/utils/styles';

export const root = cva({
  base: 'block h-2.5 bg-surface-muted bg-hatch hatch-foreground/6 hatch-1',
  defaultVariants: {
    animation: 'drift',
  },
  variants: {
    animation: {
      none: '',
      drift: 'motion-safe:animate-hatch-drift',
      pulse: 'motion-safe:animate-pulse',
    },
  },
});

import { cva } from '@/utils/styles';

export const root = cva({
  base: 'inline-flex h-5 shrink-0 items-center border border-stroke px-[calc(--spacing(1.5)-1px)] font-mono text-xs leading-none font-medium tracking-tighter text-foreground-soft lowercase',
  defaultVariants: {
    tone: 'plain',
  },
  variants: {
    tone: {
      plain: '',
      accent: 'border-foreground-accent/40 text-foreground-accent',
    },
  },
});

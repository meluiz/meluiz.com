import { cva } from '@/utils/styles';

export const root = cva({
  base: 'relative flex min-h-0 flex-col',
  defaultVariants: {
    tone: 'plain',
  },
  variants: {
    tone: {
      plain: '',
      brand: '**:[[data-scope=section][data-part=index]]:text-current',
    },
  },
});

export const header = cva({
  base: 'flex min-h-0 flex-col gap-y-1',
  defaultVariants: {
    divided: false,
    inset: 'none',
  },
  variants: {
    divided: {
      true: 'border-b border-stroke-soft',
    },
    inset: {
      none: '',
      small: 'px-3 py-4',
      medium: 'px-4 py-6 sm:px-6',
    },
  },
});

export const index = cva({
  base: 'font-mono text-xs font-medium text-foreground-soft tabular-nums',
  variants: {},
});

export const title = cva({
  base: 'text-balance text-foreground-accent',
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    size: {
      medium: 'flex baseline-start gap-x-3 font-mono text-base font-medium',
      large:
        'max-w-[18ch] font-sans text-xl leading-tight font-medium tracking-tight sm:text-2xl',
    },
  },
});

export const description = cva({
  base: 'max-w-[64ch] font-sans text-sm text-foreground-soft',
  defaultVariants: {
    indent: false,
  },
  variants: {
    indent: {
      true: 'sm:pl-6.5',
    },
  },
});

export const body = cva({
  base: 'relative flex flex-col gap-y-2',
  defaultVariants: {
    indent: false,
  },
  variants: {
    indent: {
      true: 'max-w-[64ch] sm:pl-6.5',
    },
  },
});

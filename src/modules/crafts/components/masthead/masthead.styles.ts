import { sva } from '@/utils/styles';

export const masthead = sva({
  variants: {},
  slots: ['root', 'serial', 'serialLabel', 'heading', 'eyebrow', 'title'],
  base: {
    root: 'relative flex shrink-0 gap-x-4 divide-x divide-stroke',
    serial:
      'flex shrink-0 flex-col stretch-center px-7 font-mono text-sm/4 font-medium tracking-wider text-foreground-muted uppercase',
    serialLabel: 'rotate-180 [writing-mode:vertical-lr]',
    heading: 'relative flex min-w-0 flex-1 flex-col gap-y-2 pt-12 pb-11',
    eyebrow: 'font-mono text-sm/4 font-medium tracking-wide text-foreground-accent uppercase',
    title:
      'font-sans text-3xl leading-none font-medium tracking-tight text-balance text-foreground sm:text-4xl **:[mark]:bg-transparent **:[mark]:text-foreground-accent',
  },
});

import { sva } from '@/utils/styles';

export const about = sva({
  variants: {},
  slots: ['root', 'text', 'section'],
  base: {
    root: 'relative flex flex-col gap-y-8 px-4 pt-8 pb-10 sm:px-6 sm:pb-12',
    section: 'gap-y-2',
    text: 'font-sans text-sm leading-relaxed tracking-wide text-foreground-prose *:[mark]:bg-transparent *:[mark]:text-foreground-accent',
  },
});

import { sva } from '@/utils/styles';

export const overview = sva({
  variants: {},
  slots: ['root', 'section', 'text', 'actions', 'note'],
  base: {
    root: 'relative flex flex-col px-4 pb-10 sm:px-6 sm:pb-12',
    section: 'gap-y-2',
    text: 'font-sans text-body text-foreground-prose **:[code,mark]:bg-transparent **:[code,mark]:font-mono **:[code,mark]:break-all **:[code,mark]:text-foreground-accent',
    actions: 'flex flex-wrap gap-2 pt-3',
    note: 'pt-4 font-sans text-xs text-foreground-soft **:[a]:font-mono **:[a]:text-foreground **:[a]:underline **:[a]:decoration-stroke-strong **:[a]:underline-offset-4 **:[a]:hover:text-foreground-accent **:[a]:hover:decoration-foreground-accent',
  },
});

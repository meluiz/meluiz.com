import { sva } from '@/utils/styles';

export const contact = sva({
  variants: {},
  slots: ['root', 'header', 'heading', 'eyebrow', 'title', 'description', 'email', 'emailIcon'],
  base: {
    root: 'overflow-hidden border-hidden bg-surface-brand bg-hatch text-foreground-on-brand hatch-foreground-on-brand/8 hatch-2',
    header: 'gap-y-6 px-4 py-10 sm:px-6 sm:py-14',
    heading: 'flex flex-col gap-y-3',
    eyebrow: 'font-mono text-label uppercase',
    title: 'text-2xl leading-tight text-current sm:text-3xl',
    description: 'max-w-[52ch] leading-relaxed text-current',
    email:
      'group inline-flex w-fit center-start gap-x-2 border-b border-current pb-1 font-mono text-heading outline-offset-4 focus-visible:outline-current sm:text-lg',
    emailIcon:
      'size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1',
  },
});

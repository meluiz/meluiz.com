import { sva } from '@/utils/styles';

export const masthead = sva({
  variants: {},
  slots: ['root', 'banner', 'code', 'mascot', 'meta', 'heading', 'title', 'details'],
  base: {
    root: 'relative flex flex-col',
    banner:
      'relative flex flex-col gap-y-10 overflow-hidden bg-surface-brand bg-hatch px-4 pt-12 pb-4 text-foreground-on-brand hatch-foreground-on-brand/8 hatch-2 sm:gap-y-14 sm:px-6 sm:pt-16',
    code: 'flex center gap-x-[0.04em] font-sans text-[7rem] leading-none font-semibold tracking-tighter sm:text-[12rem]',
    mascot:
      'size-[0.82em] shrink-0 **:data-[part=body]:fill-foreground-on-brand **:data-[part=eye]:fill-surface-brand **:data-[part=mark]:stroke-surface-brand',
    meta: 'text-label flex center-between gap-x-4 font-mono uppercase',
    heading: 'flex flex-col gap-y-2 px-4 py-8 sm:px-6',
    title: 'text-display-sm sm:text-display text-balance text-foreground',
    details:
      'text-label font-mono text-foreground-soft uppercase **:[code]:break-all **:[code]:text-foreground **:[code]:normal-case',
  },
});

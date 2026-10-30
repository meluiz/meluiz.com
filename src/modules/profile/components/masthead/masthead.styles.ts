import { sva } from '@/utils/styles';

export const masthead = sva({
  variants: {},
  slots: ['root', 'banner', 'locale', 'avatar', 'name', 'role'],
  base: {
    root: 'relative flex shrink-0 flex-col stretch-start',
    banner:
      'relative block h-28 overflow-hidden bg-surface-brand bg-hatch text-foreground-on-brand hatch-foreground-on-brand/14 hatch-3 sm:h-36',
    locale:
      'absolute right-4 bottom-3 bg-inherit font-mono text-xs leading-normal font-medium tracking-wider uppercase sm:right-6',
    avatar:
      'rounded-mark relative -mt-11 size-22 shrink-0 rounded-full bg-surface p-1 sm:-mt-12 sm:size-24 *:[img]:size-full *:[img]:rounded-full *:[img]:object-cover *:[img]:object-center',
    name: 'font-sans text-3xl leading-none font-medium tracking-tight text-balance text-foreground sm:text-4xl',
    role: 'font-mono text-xs leading-normal font-medium tracking-wider text-foreground-soft uppercase',
  },
});

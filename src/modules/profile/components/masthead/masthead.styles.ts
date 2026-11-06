import { sva } from '@/utils/styles';

export const masthead = sva({
  variants: {},
  slots: ['root', 'banner', 'locale', 'avatar', 'name', 'role'],
  base: {
    root: 'relative flex shrink-0 flex-col stretch-start',
    banner:
      'relative block h-28 overflow-hidden bg-surface-brand bg-hatch text-foreground-on-brand hatch-foreground-on-brand/8 hatch-2 sm:h-36',
    locale: 'text-label absolute right-4 bottom-3 bg-inherit font-mono uppercase sm:right-6',
    avatar:
      'rounded-mark relative -mt-11 size-22 shrink-0 rounded-full bg-surface p-1 sm:-mt-12 sm:size-24 *:[img]:size-full *:[img]:rounded-full *:[img]:object-cover *:[img]:object-center',
    name: 'text-display-sm sm:text-display text-balance text-foreground',
    role: 'text-label font-mono text-foreground-soft uppercase',
  },
});

import { sva } from '@/utils/styles';

export const masthead = sva({
  variants: {},
  slots: ['root', 'banner', 'locale', 'avatar', 'name', 'role'],
  base: {
    root: 'relative flex shrink-0 flex-col stretch-start',
    banner:
      'relative block h-28 overflow-hidden bg-surface-accent bg-hatch text-foreground-on-accent hatch-foreground-on-accent/8 hatch-2 sm:h-36',
    locale: 'absolute right-4 bottom-3 bg-inherit font-mono text-label uppercase sm:right-6',
    avatar:
      'rounded-mark relative -mt-11 size-22 shrink-0 rounded-full bg-surface p-1 sm:-mt-12 sm:size-24 *:[img]:size-full *:[img]:rounded-full *:[img]:object-cover *:[img]:object-center',
    name: 'text-display-sm text-balance text-foreground sm:text-display',
    role: 'font-mono text-label text-foreground-soft uppercase',
  },
});

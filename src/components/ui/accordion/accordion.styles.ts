import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'flex w-full flex-col border-t border-stroke-soft',
  variants: {},
});

export const item = cva({
  base: 'border-b border-stroke-soft',
  variants: {},
});

export const header = cva({
  base: 'flex',
  variants: {},
});

export const trigger = cva({
  base: cn([
    'group/accordion-trigger flex w-full cursor-pointer items-center justify-between gap-3 py-3.5 text-left font-sans text-sm/[1.3] font-medium text-foreground outline-hidden',
    'focus-visible:ring-2 focus-visible:ring-surface-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'is-disabled:cursor-not-allowed is-disabled:opacity-56',
  ]),
  variants: {},
});

export const indicator = cva({
  base: cn([
    'text-xs/none shrink-0 font-mono font-medium text-foreground-soft',
    "before:content-['[+]'] group-data-panel-open/accordion-trigger:before:content-['[−]']",
  ]),
  variants: {},
});

export const panel = cva({
  base: 'h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none is-starting:h-0 is-ending:h-0',
  variants: {},
});

export const content = cva({
  base: 'pb-3.5 font-sans text-body text-foreground-prose',
  variants: {},
});

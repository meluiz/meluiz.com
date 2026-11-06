import { cn, cva } from '@/utils/styles';

export const h2 = cva({
  base: 'scroll-mt-24 font-mono text-heading text-foreground',
  variants: {},
});

export const h3 = cva({
  base: 'scroll-mt-24 font-mono text-value text-foreground',
  variants: {},
});

export const p = cva({
  base: 'max-w-[64ch] text-body text-pretty text-foreground-prose',
  variants: {},
});

export const a = cva({
  base: 'text-foreground underline decoration-stroke-strong decoration-1 underline-offset-[3px] transition-colors duration-150 hover:decoration-stroke-accent focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-accent',
  variants: {},
});

export const strong = cva({
  base: 'font-medium text-foreground',
  variants: {},
});

export const ul = cva({
  base: 'flex max-w-[64ch] flex-col gap-2 text-body text-foreground-prose',
  variants: {},
});

export const ol = cva({
  base: 'flex max-w-[64ch] list-none flex-col gap-2 text-body text-foreground-prose [counter-reset:item]',
  variants: {},
});

export const li = cva({
  base: cn([
    'relative pl-4 before:absolute before:top-0 before:left-0',
    'in-[ul]:before:font-semibold in-[ul]:before:text-foreground-accent in-[ul]:before:content-["·"]',
    'in-[ol]:pl-8 in-[ol]:[counter-increment:item] in-[ol]:before:font-mono in-[ol]:before:text-xs/[1.3125rem] in-[ol]:before:text-foreground-muted in-[ol]:before:content-[counter(item,decimal-leading-zero)]',
  ]),
  variants: {},
});

export const hr = cva({
  base: 'my-6 border-0 border-t border-stroke-soft',
  variants: {},
});

export const blockquote = cva({
  base: `max-w-[64ch] border-l-2 border-stroke-accent pl-4 text-foreground-soft`,
  variants: {},
});

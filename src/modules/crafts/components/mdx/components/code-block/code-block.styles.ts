import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'group/code relative my-2 flex flex-col overflow-hidden rounded-xs bg-code-surface inset-ring inset-ring-code-stroke contain-inline-size',
  variants: {},
});

export const header = cva({
  base: 'flex min-h-10 items-center justify-between gap-3 border-b border-code-stroke pr-1.5 pl-4',
  variants: {},
});

export const title = cva({
  base: 'truncate font-mono text-xs/4 tracking-wide text-code-token-comment',
  variants: {},
});

export const clipboard = cva({
  base: 'text-2xs/none inline-flex h-6 shrink-0 cursor-pointer items-center rounded-xs px-1.5 font-mono font-medium tracking-wider text-foreground-muted uppercase transition-colors duration-150 hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-accent data-[state=copied]:text-foreground-accent pointer-coarse:h-9',
  defaultVariants: {
    placement: 'static',
  },
  variants: {
    placement: {
      static: '',
      floating:
        'absolute top-1.5 right-1.5 z-1 bg-code-surface opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100 data-[state=copied]:opacity-100 pointer-coarse:opacity-100',
    },
  },
});

export const clipboardText = cva({
  base: 'brackets brackets-0.5 brackets-foreground',
  variants: {},
});

export const scroller = cva({
  base: cn([
    'relative flex min-w-0 flex-col',
    // Fades the right edge while there is more code to scroll to, so clipped lines read as clipped
    'after:pointer-events-none after:absolute after:top-0 after:right-px after:bottom-px after:w-10 after:bg-linear-to-l after:from-code-surface after:to-transparent after:opacity-0 after:transition-opacity after:duration-150 data-overflow-x-end:after:opacity-100',
  ]),
  variants: {},
});

export const viewport = cva({
  base: 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stroke-accent has-[pre:focus-visible]:outline-2 has-[pre:focus-visible]:-outline-offset-2 has-[pre:focus-visible]:outline-stroke-accent',
  variants: {},
});

export const content = cva({
  base: cn([
    'w-max min-w-full py-3 font-mono text-sm/6 tab-2 text-code-foreground outline-hidden',
    // Empty lines render as `<span class="line"></span>`, which collapse to 0 height as grid items
    '**:[.line]:min-h-lh **:[.line]:px-4 **:[code]:grid **:[code]:min-w-max',
    '**:[.line.highlighted]:bg-code-highlight **:[.line.highlighted]:inset-shadow-[2px_0_0_var(--color-code-highlight-stroke)]',
    '**:[.highlighted-word]:rounded-xs **:[.highlighted-word]:bg-code-highlight **:[.highlighted-word]:px-0.5',
    '**:[.line.diff.add]:bg-code-diff-add **:[.line.diff.remove]:bg-code-diff-remove **:[.line.diff.remove]:opacity-60',
    '[&.has-focused]:**:[.line]:transition-[opacity,filter] [&.has-focused]:**:[.line]:duration-200 [&.has-focused]:**:[.line]:not-[.focused]:opacity-40 [&.has-focused]:**:[.line]:not-[.focused]:blur-[1px] group-hover/code:[&.has-focused]:**:[.line]:not-[.focused]:opacity-100 group-hover/code:[&.has-focused]:**:[.line]:not-[.focused]:blur-none',
  ]),
  variants: {},
});

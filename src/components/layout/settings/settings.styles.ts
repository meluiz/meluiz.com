import { cn, cva } from '@/utils/styles';

export const readout = cva({
  base: cn([
    'group/readout relative inline-flex h-9 shrink-0 cursor-pointer flex-col items-start justify-center gap-0.5 px-2 text-left outline-hidden select-none hover:bg-surface-muted',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground-accent',
    'aria-disabled:cursor-not-allowed',
  ]),
  defaultVariants: {
    scrub: false,
  },
  variants: {
    scrub: {
      true: 'touch-none aria-[disabled=false]:cursor-ew-resize',
    },
  },
});

export const label = cva({
  base: 'font-mono text-3xs font-medium tracking-widest text-foreground-muted uppercase',
  variants: {},
});

export const value = cva({
  base: 'inline-flex animate-flash items-center font-mono text-xs/3.5 font-medium tracking-wide whitespace-pre text-foreground uppercase group-aria-disabled/readout:text-foreground-muted motion-reduce:animate-none',
  defaultVariants: {
    bracketed: false,
  },
  variants: {
    bracketed: {
      true: 'brackets brackets-foreground-soft',
    },
  },
});

export const arrows = cva({
  base: 'pointer-events-none absolute inset-0 flex items-center justify-between px-px font-mono text-3xs leading-none font-medium text-foreground-muted opacity-0 transition-opacity duration-150 ease-out-quint group-hover/readout:opacity-100 group-focus-visible/readout:opacity-100',
  variants: {},
});

export const meter = cva({
  base: 'ml-1.5 inline-flex gap-0.5 data-nudge:animate-nudge motion-reduce:animate-none',
  variants: {},
});

export const bar = cva({
  base: 'h-2.25 w-0.75 bg-stroke-strong data-on:bg-foreground-accent group-aria-disabled/readout:data-on:bg-foreground-muted',
  variants: {},
});

export const hint = cva({
  base: cn([
    'z-60 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)',
    'transition-[top,left,right,bottom,transform] duration-300 ease-out-expo data-instant:transition-none motion-reduce:transition-none',
  ]),
  variants: {},
});

export const hintPopup = cva({
  base: cn([
    'h-(--popup-height,auto) w-(--popup-width,auto) overflow-clip bg-surface-inverse font-mono text-2xs font-medium tracking-wider whitespace-nowrap text-foreground-inverse uppercase',
    'origin-(--transform-origin) transition-[width,height,opacity,translate] duration-300 ease-out-expo data-instant:transition-none motion-reduce:transition-none',
    'data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:translate-y-1 data-starting-style:opacity-0',
  ]),
  variants: {},
});

export const hintViewport = cva({
  base: cn([
    'relative size-full px-1.75 py-1.25',
    '**:data-current:transition-opacity **:data-current:duration-150 **:data-current:data-starting-style:opacity-0',
    '**:data-previous:transition-opacity **:data-previous:duration-100 **:data-previous:data-ending-style:opacity-0',
  ]),
  variants: {},
});

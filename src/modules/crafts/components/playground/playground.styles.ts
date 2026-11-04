import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: cn([
    'relative grid max-w-full place-items-center gap-2 overflow-hidden bg-surface bg-hatch text-foreground transition-colors duration-200 ease-in-out-base hatch-stroke/56 hatch-2',
    'in-[[data-scope=playground][data-part=stage]]:aspect-21/9',
    'in-[[data-scope=playground][data-part=inline]]:min-h-56 in-[[data-scope=playground][data-part=inline]]:px-4 in-[[data-scope=playground][data-part=inline]]:pt-11 in-[[data-scope=playground][data-part=inline]]:pb-5 in-[[data-scope=playground][data-part=inline]]:ring in-[[data-scope=playground][data-part=inline]]:ring-stroke',
  ]),
  variants: {},
});

export const stage = cva({
  base: 'relative isolate min-h-0',
  variants: {},
});

export const inline = cva({
  base: 'my-2 flex flex-col gap-2',
  variants: {},
});

export const caption = cva({
  base: 'max-w-[65ch] font-sans text-xs/normal font-normal text-foreground-muted',
  variants: {},
});

export const label = cva({
  base: cn([
    'pointer-events-none absolute font-mono font-medium tracking-tighter text-foreground-muted uppercase',
    'in-[[data-scope=playground][data-part=stage]]:top-4.5 in-[[data-scope=playground][data-part=stage]]:left-3.5 in-[[data-scope=playground][data-part=stage]]:text-xs/4',
    'in-[[data-scope=playground][data-part=inline]]:top-3 in-[[data-scope=playground][data-part=inline]]:left-3 in-[[data-scope=playground][data-part=inline]]:text-2xs/3.5',
  ]),
  variants: {},
});

export const toolbar = cva({
  base: 'absolute top-2.5 right-2.5 z-10 flex center-end gap-1.5',
  variants: {},
});

export const actions = cva({
  base: 'relative flex center-end gap-1.5',
  variants: {},
});

export const action = cva({
  base: 'font-mono uppercase',
  variants: {},
});

export const trigger = cva({
  composes: [action],
  base: 'text-xs',
  variants: {},
});

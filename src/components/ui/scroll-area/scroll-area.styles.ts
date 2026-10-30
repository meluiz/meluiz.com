import { cn, cva } from '@/utils/styles';

export const root = cva({
  base: 'relative flex min-h-0 flex-col',
  variants: {},
});

export const viewport = cva({
  base: 'relative flex min-h-0 flex-1 flex-col',
  variants: {},
});

export const content = cva({
  base: 'relative flex w-full flex-1 flex-col',
  variants: {},
});

export const scrollbar = cva({
  base: cn([
    'group/scrollbar horizontal:mb-0.4 flex justify-center opacity-0 transition-opacity delay-500 duration-300 horizontal:h-2.5 horizontal:flex-col horizontal:px-2 vertical:mr-0.5 vertical:w-2.5 vertical:py-2',
    'data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-0',
  ]),
  variants: {},
});

export const thumb = cva({
  base: 'relative bg-stroke-accent transition-[width,height] duration-150 horizontal:h-1 horizontal:group-hover/scrollbar:h-1.5 vertical:w-1 vertical:group-hover/scrollbar:w-1.5',
  variants: {},
});

export const corner = cva({
  base: 'bg-transparent',
  variants: {},
});

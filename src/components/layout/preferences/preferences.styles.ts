import { cva, sva } from '@/utils/styles';

export const indicator = cva({
  base: 'is-open:animate-in is-open:blur-in is-open:fade-in is-closed:animate-out is-closed:blur-out is-closed:fade-out **:[svg]:mx-0!',
  variants: {
    animation: {
      dial: 'is-open:spin-in-90 is-closed:-spin-out-90',
      swing: 'origin-bottom-left is-open:-spin-in-15 is-closed:spin-out-15',
    },
  },
});

// Mirrors the layout `Swap` gives the indicators, so swapping in the real toggle doesn't shift
export const fallback = sva({
  variants: {},
  slots: ['root', 'indicator'],
  base: {
    root: '-mx-0.5 inline-grid size-3.5 text-foreground',
    indicator: 'col-start-1 row-start-1 **:[svg]:mx-0!',
  },
});

export const label = cva({
  variants: {},
  base: 'brackets min-w-10 font-mono uppercase brackets-0.5 brackets-foreground',
});

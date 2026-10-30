import { cva } from '@/utils/styles';

export const root = cva({
  base: 'flex flex-col divide-y divide-stroke-soft',
  variants: {},
});

export const item = cva({
  base: 'grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-[11rem_minmax(0,1fr)]',
  variants: {},
});

export const aside = cva({
  base: 'flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1.5 md:flex-col md:items-start',
  variants: {},
});

export const content = cva({
  base: 'flex min-w-0 flex-col gap-y-4',
  variants: {},
});

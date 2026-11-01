import { cn, sva } from '@/utils/styles';

export const navigation = sva({
  variants: {},
  slots: ['faces', 'face', 'track'],
  base: {
    faces:
      'relative overflow-x-clip transition-[width] duration-360 ease-out-expo motion-reduce:transition-none',
    face: cn([
      'flex w-max max-w-[calc(100vw-(--spacing(8.5)))] items-center gap-0.5 transition-[opacity,translate,visibility] ease-out-quint motion-reduce:transition-none',
      'is-open:transition-[opacity,translate] is-open:delay-100 is-open:duration-200',
      'is-closed:invisible is-closed:absolute is-closed:top-0 is-closed:left-0 is-closed:translate-y-1.5 is-closed:opacity-0 is-closed:duration-100',
    ]),
    track:
      'flex min-w-0 snap-x snap-proximity scrollbar-none overflow-x-auto overscroll-x-contain *:snap-start',
  },
});

import { cva } from '@/utils/styles';

export const indicator = cva({
  base: 'is-open:animate-in is-open:blur-in is-open:fade-in is-closed:animate-out is-closed:blur-out is-closed:fade-out **:[svg]:mx-0!',
  variants: {
    animation: {
      dial: 'is-open:spin-in-90 is-closed:-spin-out-90',
      swing: 'origin-bottom-left is-open:-spin-in-15 is-closed:spin-out-15',
    },
  },
});

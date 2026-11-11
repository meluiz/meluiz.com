import { cva } from '@/utils/styles';

export const root = cva({
  base: 'inline-flex font-mono text-numeral font-medium tracking-normal text-foreground tabular-nums',
  variants: {},
});

export const pad = cva({
  base: 'text-current/64',
  variants: {},
});

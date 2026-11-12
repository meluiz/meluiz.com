import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('checkbox', [
  'root',
  'indicator',
  'check_icon',
  'indeterminate_icon',
]);

export const parts = anatomy.build();

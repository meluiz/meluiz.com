import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('progress', [
  'root',
  'label',
  'value',
  'track',
  'indicator',
]);

export const parts = anatomy.build();

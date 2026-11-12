import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('slider', [
  'root',
  'label',
  'value',
  'control',
  'track',
  'indicator',
  'thumb',
]);

export const parts = anatomy.build();

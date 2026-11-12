import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('number-field', [
  'root',
  'scrub_area',
  'scrub_area_cursor',
  'group',
  'input',
  'decrement',
  'increment',
]);

export const parts = anatomy.build();

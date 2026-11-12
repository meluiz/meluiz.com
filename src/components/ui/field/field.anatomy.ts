import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('field', [
  'root',
  'label',
  'input',
  'textarea',
  'description',
  'error',
  'item',
]);

export const parts = anatomy.build();

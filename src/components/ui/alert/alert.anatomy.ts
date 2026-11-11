import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('alert', [
  'root',
  'indicator',
  'content',
  'title',
  'description',
  'action',
]);

export const parts = anatomy.build();

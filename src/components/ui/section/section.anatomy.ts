import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('section', [
  'root',
  'header',
  'index',
  'title',
  'description',
  'body',
]);

export const parts = anatomy.build();

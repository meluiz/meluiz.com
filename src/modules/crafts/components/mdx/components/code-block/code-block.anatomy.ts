import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('code-block', [
  'root',
  'header',
  'title',
  'clipboard',
  'content',
]);

export const parts = anatomy.build();

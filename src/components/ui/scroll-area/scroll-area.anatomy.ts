import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('scroll-area', [
  'root',
  'viewport',
  'content',
  'scrollbar',
  'thumb',
  'corner',
]);

export const parts = anatomy.build();

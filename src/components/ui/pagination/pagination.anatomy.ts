import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('pagination', [
  'root',
  'list',
  'item',
  'link',
  'previous',
  'next',
  'ellipsis',
]);

export const parts = anatomy.build();

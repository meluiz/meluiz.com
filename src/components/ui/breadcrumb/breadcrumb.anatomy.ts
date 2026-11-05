import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('breadcrumb', [
  'root',
  'list',
  'item',
  'link',
  'page',
  'separator',
  'ellipsis',
]);

export const parts = anatomy.build();

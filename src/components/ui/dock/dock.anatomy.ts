import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('dock').parts(
  'positioner',
  'root',
  'list',
  'item',
  'separator',
  'trigger',
  'panel',
  'close',
);

export const parts = anatomy.build();

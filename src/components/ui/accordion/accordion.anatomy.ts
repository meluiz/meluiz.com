import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('accordion', [
  'root',
  'item',
  'header',
  'trigger',
  'indicator',
  'panel',
  'content',
]);

export const parts = anatomy.build();

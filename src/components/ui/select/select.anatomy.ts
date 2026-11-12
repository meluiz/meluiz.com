import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('select', [
  'trigger',
  'value',
  'icon',
  'positioner',
  'popup',
  'scroll_up_arrow',
  'list',
  'scroll_down_arrow',
  'item',
  'item_text',
  'item_indicator',
  'group',
  'group_label',
  'separator',
]);

export const parts = anatomy.build();

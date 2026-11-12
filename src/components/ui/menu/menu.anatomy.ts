import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('menu', [
  'trigger',
  'positioner',
  'popup',
  'item',
  'link_item',
  'submenu_trigger',
  'shortcut',
  'group',
  'group_label',
  'separator',
]);

export const parts = anatomy.build();

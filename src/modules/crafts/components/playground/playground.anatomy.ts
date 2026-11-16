import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('playground', [
  'root',
  'stage',
  'inline',
  'caption',
  'label',
  'toolbar',
  'actions',
  'action',
  'select',
  'trigger',
  'status_bar',
  'status',
  'hint',
]);

export const parts = anatomy.build();

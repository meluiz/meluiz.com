import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('ruled-grid', ['root', 'cell']);

export const parts = anatomy.build();

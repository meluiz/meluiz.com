import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('data-list', ['root', 'item', 'term', 'details']);

export const parts = anatomy.build();

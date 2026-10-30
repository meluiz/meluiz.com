import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('timeline', ['root', 'item', 'aside', 'content']);

export const parts = anatomy.build();

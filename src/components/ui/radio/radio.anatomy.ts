import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('radio', ['group', 'root', 'indicator']);

export const parts = anatomy.build();

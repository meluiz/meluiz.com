import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('numeral', ['root', 'pad', 'value']);

export const parts = anatomy.build();

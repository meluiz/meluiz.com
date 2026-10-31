import { createAnatomy } from '@/utils/dom';

export const anatomy = createAnatomy('mascot', ['root', 'body', 'group', 'eye', 'mark']);

export const parts = anatomy.build();

import type { Theme } from './context-provider.context';

export const DARK_MEDIA = '(prefers-color-scheme: dark)';

export const DEFAULT_THEME: Theme = 'system';
export const THEMES: Theme[] = ['system', 'light', 'dark'];

export const COOKIE_NAME = 'theme-preferences';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const CHANGE_EVENT_NAME = 'themechange';

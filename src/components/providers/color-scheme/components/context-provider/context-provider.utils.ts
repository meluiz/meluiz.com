import type { Theme } from './context-provider.context';

import { DEFAULT_THEME, THEMES } from './context-provider.constants';

export const isTheme = (value: unknown): value is Theme => {
  return THEMES.includes(value as Theme);
};

export const toTheme = (value: unknown): Theme => {
  return isTheme(value) ? value : DEFAULT_THEME;
};

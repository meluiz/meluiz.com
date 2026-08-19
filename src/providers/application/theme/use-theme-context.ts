'use client';

import type { ResolvedTheme, Theme } from './theme-schemas';

import { createContext } from '@ark-ui/react';

export type UseThemeContext = {
  value: Theme;
  system: ResolvedTheme;
  resolved: ResolvedTheme;
  options: readonly Theme[];
  setTheme: (theme?: Theme) => void;
};

export const [ThemeContextProvider, useThemeContext] = createContext<UseThemeContext>({
  strict: true,
  name: 'ThemeContext',
  hookName: 'useThemeContext',
  providerName: '<ThemeProvider />',
});

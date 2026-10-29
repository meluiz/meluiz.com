'use client';

import { createContext } from '@/utils/react';

export type Theme = 'system' | 'light' | 'dark';
export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface UseColorSchemeReturn {
  theme: Theme;
  themes: Theme[];
  resolvedTheme: ResolvedTheme;
  setTheme: (patch: Theme | ((prev: Theme) => Theme)) => void;
  toggleTheme: VoidFunction;
}

export const [ColorSchemeContext, useColorScheme] = createContext<UseColorSchemeReturn>({
  name: 'ColorSchemeContext',
  hookName: 'useColorScheme',
  providerName: 'ColorScheme.Provider',
});

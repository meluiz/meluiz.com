import type React from 'react';
import type { ResolvedTheme } from './components';

import { CLIENT_HINT_HEADER, RESOLVED_THEMES } from './color-scheme.constants';
import { COOKIE_NAME, ContextProvider, toTheme } from './components';

/* ///////////////////////////////////////////////// */

const isResolvedTheme = (value: unknown): value is ResolvedTheme => {
  return RESOLVED_THEMES.includes(value as ResolvedTheme);
};

const getColorScheme = async () => {
  const { cookies, headers } = await import('next/headers');
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  const hint = headerStore.get(CLIENT_HINT_HEADER);

  return {
    theme: toTheme(cookieStore.get(COOKIE_NAME)?.value),
    systemTheme: isResolvedTheme(hint) ? hint : undefined,
  };
};

/* ///////////////////////////////////////////////// */

export interface ProviderProps {
  children?: React.ReactNode;
}

export const Provider = async (props: ProviderProps) => {
  const { children } = props;

  const { theme, systemTheme } = await getColorScheme();

  return (
    <ContextProvider theme={theme} systemTheme={systemTheme}>
      {children}
    </ContextProvider>
  );
};

/* ///////////////////////////////////////////////// */

export { Script } from './color-scheme.script';

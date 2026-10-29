import type React from 'react';
import type { ResolvedTheme } from './components';

import { CLIENT_HINT_HEADER, RESOLVED_THEMES } from './color-scheme.constants';
import {
  COOKIE_NAME,
  ContextProvider,
  DARK_MEDIA,
  DEFAULT_THEME,
  THEMES,
  toTheme,
} from './components';

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

const THEME_SCRIPT = `(() => {
  try {
    const entry = document.cookie.split('; ').find((part) => part.startsWith(${JSON.stringify(`${COOKIE_NAME}=`)}));
    const stored = entry ? decodeURIComponent(entry.slice(${COOKIE_NAME.length + 1})) : null;
    const theme = ${JSON.stringify(THEMES)}.includes(stored) ? stored : ${JSON.stringify(DEFAULT_THEME)};
    const resolved = theme === 'system' ? (matchMedia(${JSON.stringify(DARK_MEDIA)}).matches ? 'dark' : 'light') : theme;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch {}
})()`;

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

export const Script = () => {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from constants
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
};

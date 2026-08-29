'use client';

import Cookies from 'js-cookie';
import { Duration } from 'luxon';
import React from 'react';

import { type ResolvedTheme, type Theme, ThemeScheme } from './theme-schemas';
import { ThemeContextProvider, type UseThemeContext } from './use-theme-context';

export const THEME_COOKIE = 'ch-prefers-color-scheme';
export const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const THEME_EXPIRES_DAYS = Duration.fromObject({ years: 1 }).as('days');

/* ///////////////////////////////////////////////// */

const writeCookie = (name: string, value: string) => {
  Cookies.set(name, value, {
    path: '/',
    sameSite: 'lax',
    expires: THEME_EXPIRES_DAYS,
  });
};

const applyTheme = (resolved: ResolvedTheme) => {
  const doc = document.documentElement;

  doc.classList.remove('dark', 'light');
  doc.classList.add(resolved);

  doc.style.colorScheme = resolved;
};

/* ///////////////////////////////////////////////// */

export type ThemeProviderProps = React.PropsWithChildren<{
  value: Omit<UseThemeContext, 'setTheme'>;
}>;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { value: theme, children } = props;

  const [value, setValue] = React.useState<Theme>(theme.resolved);
  const [system, setSystem] = React.useState<ResolvedTheme>(theme.system);

  const resolved: ResolvedTheme = value === 'system' ? system : value;

  const setTheme = (next?: Theme) => {
    const target = next ?? (value === 'dark' ? 'light' : 'dark');
    const parsed = ThemeScheme.parse(target);

    setValue(parsed);
    writeCookie(THEME_COOKIE, parsed);
  };

  React.useEffect(() => {
    const media = window.matchMedia(THEME_MEDIA_QUERY);

    const synchronize = () => {
      setSystem(media.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', synchronize);
    synchronize();

    return () => {
      media.removeEventListener('change', synchronize);
    };
  }, []);

  React.useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  return (
    <ThemeContextProvider
      value={{
        value,
        system,
        resolved,
        setTheme,
        options: theme.options,
      }}
    >
      {children}
    </ThemeContextProvider>
  );
};

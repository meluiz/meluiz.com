'use client';

import type { ResolvedTheme, Theme, UseColorSchemeReturn } from './context-provider.context';

import React from 'react';

import {
  CHANGE_EVENT_NAME,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  DARK_MEDIA,
  THEMES,
} from './context-provider.constants';
import { ColorSchemeContext } from './context-provider.context';
import { toTheme } from './context-provider.utils';

/* ///////////////////////////////////////////////// */

const getSystemTheme = (): ResolvedTheme => {
  return matchMedia(DARK_MEDIA).matches ? 'dark' : 'light';
};

const readTheme = (): Theme => {
  const prefix = `${COOKIE_NAME}=`;
  const entry = document.cookie.split('; ').find((part) => part.startsWith(prefix));

  return toTheme(entry ? decodeURIComponent(entry.slice(prefix.length)) : null);
};

const writeTheme = (theme: Theme) => {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API isn't available everywhere yet
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(theme)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const resolved = theme === 'system' ? getSystemTheme() : theme;

  root.classList.remove('light', 'dark');
  root.classList.add(resolved);

  root.style.colorScheme = resolved;
};

const subscribeTheme = (callback: VoidFunction) => {
  const handleFocus = () => {
    applyTheme(readTheme());
    callback();
  };

  window.addEventListener('focus', handleFocus);
  window.addEventListener(CHANGE_EVENT_NAME, callback);

  return () => {
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener(CHANGE_EVENT_NAME, callback);
  };
};

const subscribeSystemTheme = (callback: VoidFunction) => {
  const media = matchMedia(DARK_MEDIA);

  const handleChange = () => {
    applyTheme(readTheme());
    callback();
  };

  media.addEventListener('change', handleChange);

  return () => {
    media.removeEventListener('change', handleChange);
  };
};

/* ///////////////////////////////////////////////// */

export interface ContextProviderProps {
  theme: Theme;
  systemTheme?: ResolvedTheme;
  children?: React.ReactNode;
}

export const ContextProvider = (props: ContextProviderProps) => {
  const { children } = props;

  const theme = React.useSyncExternalStore(subscribeTheme, readTheme, () => props.theme);
  const systemTheme = React.useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    () => props.systemTheme ?? 'light',
  );

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const setTheme: UseColorSchemeReturn['setTheme'] = (value) => {
    const next = typeof value === 'function' ? value(theme) : value;

    writeTheme(next);
    applyTheme(next);

    window.dispatchEvent(new Event(CHANGE_EVENT_NAME));
  };

  const toggleTheme = () => {
    const isLightTheme = resolvedTheme === 'light';
    setTheme(isLightTheme ? 'dark' : 'light');
  };

  // React.useLayoutEffect(() => {
  //   applyTheme(readTheme());
  // }, []);

  return (
    <ColorSchemeContext
      value={{
        theme,
        themes: THEMES,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ColorSchemeContext>
  );
};

'use client';

import type { ResolvedTheme, Theme, UseColorSchemeReturn } from './context-provider.context';

import React from 'react';

import { useSafeLayoutEffect } from '@/hooks/lifecycle';

import {
  CHANGE_EVENT_NAME,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  DARK_MEDIA,
  DEFAULT_THEME,
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

  root.dataset.theme = theme;
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

const getServerTheme = (): Theme => DEFAULT_THEME;
const getServerSystemTheme = (): ResolvedTheme => 'light';

/* ///////////////////////////////////////////////// */

export interface ContextProviderProps {
  children?: React.ReactNode;
}

export const ContextProvider = (props: ContextProviderProps) => {
  const { children } = props;

  const theme = React.useSyncExternalStore(subscribeTheme, readTheme, getServerTheme);
  const systemTheme = React.useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    getServerSystemTheme,
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

  // When hydration fails (a proxy rewriting the HTML, a browser extension), React re-creates
  // <html> from the server markup and drops the class the inline script set. Re-apply it before
  // paint; on a normal load this is a no-op
  useSafeLayoutEffect(() => {
    applyTheme(readTheme());
  }, []);

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

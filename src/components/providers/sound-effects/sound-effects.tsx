import type React from 'react';

import {
  COOKIE_NAME,
  ContextProvider,
  DEFAULT_PREFERENCES,
  PRESETS,
  toPreferences,
} from './components';

/* ///////////////////////////////////////////////// */

const getPreferences = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return toPreferences(cookieStore.get(COOKIE_NAME)?.value);
};

/* ///////////////////////////////////////////////// */

const SOUND_SCRIPT = `(() => {
  try {
    const entry = document.cookie.split('; ').find((part) => part.startsWith(${JSON.stringify(`${COOKIE_NAME}=`)}));
    const stored = JSON.parse(entry ? decodeURIComponent(entry.slice(${COOKIE_NAME.length + 1})) : '{}');
    const enabled = typeof stored.enabled === 'boolean' ? stored.enabled : ${JSON.stringify(DEFAULT_PREFERENCES.enabled)};
    const preset = ${JSON.stringify(PRESETS)}.includes(stored.preset) ? stored.preset : ${JSON.stringify(DEFAULT_PREFERENCES.preset)};
    const root = document.documentElement;
    root.dataset.sound = enabled ? 'on' : 'off';
    root.dataset.soundPreset = preset;
  } catch {}
})()`;

/* ///////////////////////////////////////////////// */

export interface ProviderProps {
  children?: React.ReactNode;
}

export const Provider = async (props: ProviderProps) => {
  const { children } = props;

  const preferences = await getPreferences();

  return <ContextProvider preferences={preferences}>{children}</ContextProvider>;
};

/* ///////////////////////////////////////////////// */

export const Script = () => {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from constants
  return <script dangerouslySetInnerHTML={{ __html: SOUND_SCRIPT }} />;
};

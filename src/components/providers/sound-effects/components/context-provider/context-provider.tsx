'use client';

import type {
  Sound,
  SoundName,
  SoundOptions,
  SoundPreferences,
  SoundTrigger,
  UseSoundEffectsReturn,
} from './context-provider.context';

import { play, setEnabled, setTheme, setVolume, unlock } from 'cuelume';
import React from 'react';

import {
  CHANGE_EVENT_NAME,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  PRESETS,
  SOUNDS,
} from './context-provider.constants';
import { SoundEffectsContext } from './context-provider.context';
import { toPreferences } from './context-provider.utils';

/* ///////////////////////////////////////////////// */

let cachedRaw: string | null | undefined;
let cachedPreferences: SoundPreferences;

const readPreferences = (): SoundPreferences => {
  const prefix = `${COOKIE_NAME}=`;
  const entry = document.cookie.split('; ').find((part) => part.startsWith(prefix));
  const raw = entry ? decodeURIComponent(entry.slice(prefix.length)) : null;

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedPreferences = toPreferences(raw);
  }

  return cachedPreferences;
};

const writePreferences = (preferences: SoundPreferences) => {
  const value = encodeURIComponent(JSON.stringify(preferences));

  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API isn't available everywhere yet
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const applyPreferences = (preferences: SoundPreferences) => {
  const { enabled, volume, preset } = preferences;
  const root = document.documentElement;

  setEnabled(enabled);
  setVolume(volume);
  setTheme(preset);

  root.dataset.sound = enabled ? 'on' : 'off';
  root.dataset.soundPreset = preset;
};

const subscribePreferences = (callback: VoidFunction) => {
  const handleFocus = () => {
    applyPreferences(readPreferences());
    callback();
  };

  window.addEventListener('focus', handleFocus);
  window.addEventListener(CHANGE_EVENT_NAME, callback);

  return () => {
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener(CHANGE_EVENT_NAME, callback);
  };
};

const createTrigger = (name: SoundName): SoundTrigger => {
  return ((callback?: (...args: unknown[]) => unknown, options?: SoundOptions) => {
    if (!callback) {
      play(name, options);
      return;
    }

    return (...args: unknown[]) => {
      play(name, options);
      return callback(...args);
    };
  }) as SoundTrigger;
};

const PLAY = Object.fromEntries(SOUNDS.map((name) => [name, createTrigger(name)])) as Sound;

/* ///////////////////////////////////////////////// */

export interface ContextProviderProps {
  preferences: SoundPreferences;
  children?: React.ReactNode;
}

export const ContextProvider = (props: ContextProviderProps) => {
  const { children } = props;

  const preferences = React.useSyncExternalStore(
    subscribePreferences,
    readPreferences,
    () => props.preferences,
  );

  const setPreferences: UseSoundEffectsReturn['setPreferences'] = (value) => {
    const patch = typeof value === 'function' ? value(preferences) : value;
    const next = { ...preferences, ...patch };

    writePreferences(next);
    applyPreferences(next);

    window.dispatchEvent(new Event(CHANGE_EVENT_NAME));
  };

  const setEnabled: UseSoundEffectsReturn['setEnabled'] = (value) => {
    const enabled = typeof value === 'function' ? value(preferences.enabled) : value;
    setPreferences({ enabled });
  };

  const setVolume: UseSoundEffectsReturn['setVolume'] = (value) => {
    const volume = typeof value === 'function' ? value(preferences.volume) : value;
    setPreferences({ volume });
  };

  const setPreset: UseSoundEffectsReturn['setPreset'] = (value) => {
    const preset = typeof value === 'function' ? value(preferences.preset) : value;
    setPreferences({ preset });
  };

  React.useEffect(() => {
    applyPreferences(readPreferences());
  }, []);

  React.useEffect(() => {
    if (!preferences.enabled) {
      return;
    }

    const handleGesture = () => void unlock();
    const options = {
      capture: true,
      passive: true,
    };

    window.addEventListener('pointerdown', handleGesture, options);
    window.addEventListener('keydown', handleGesture, options);

    return () => {
      window.removeEventListener('pointerdown', handleGesture, options);
      window.removeEventListener('keydown', handleGesture, options);
    };
  }, [preferences.enabled]);

  return (
    <SoundEffectsContext
      value={{
        ...preferences,
        play: PLAY,
        sounds: SOUNDS,
        presets: PRESETS,
        setEnabled,
        setVolume,
        setPreset,
        setPreferences,
      }}
    >
      {children}
    </SoundEffectsContext>
  );
};

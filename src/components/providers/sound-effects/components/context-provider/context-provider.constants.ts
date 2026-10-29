import type { SoundName, SoundPreferences, SoundPreset } from './context-provider.context';

import { sounds, themes } from 'cuelume';

export const SOUNDS: SoundName[] = [...sounds];
export const PRESETS: SoundPreset[] = [...themes];

export const DEFAULT_PREFERENCES: SoundPreferences = {
  enabled: true,
  volume: 1,
  preset: 'default',
};

export const COOKIE_NAME = 'sound-preferences';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const CHANGE_EVENT_NAME = 'soundchange';

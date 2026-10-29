import type { SoundPreferences, SoundPreset } from './context-provider.context';

import { DEFAULT_PREFERENCES, PRESETS } from './context-provider.constants';

export const isPreset = (value: unknown): value is SoundPreset => {
  return PRESETS.includes(value as SoundPreset);
};

export const toPreferences = (value: string | null | undefined): SoundPreferences => {
  try {
    const parsed = JSON.parse(value ?? '{}');

    return {
      enabled:
        typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_PREFERENCES.enabled,
      volume: Number.isFinite(parsed.volume)
        ? Math.min(1, Math.max(0, parsed.volume))
        : DEFAULT_PREFERENCES.volume,
      preset: isPreset(parsed.preset) ? parsed.preset : DEFAULT_PREFERENCES.preset,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

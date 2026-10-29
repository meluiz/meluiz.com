'use client';

import type { PlayOptions, SoundName, ThemeName } from 'cuelume';

import { createContext } from '@/utils/react';

export type { SoundName };

export type SoundPreset = ThemeName;
export type SoundOptions = PlayOptions;

export interface SoundPreferences {
  enabled: boolean;
  volume: number;
  preset: SoundPreset;
}

export type SoundTrigger = <A extends unknown[], R>(
  callback?: (...args: A) => R,
  options?: SoundOptions,
) => (...args: A) => R | undefined;

export type Sound = Record<SoundName, SoundTrigger>;

export interface UseSoundEffectsReturn extends SoundPreferences {
  play: Sound;
  sounds: SoundName[];
  presets: SoundPreset[];
  setEnabled: (patch: boolean | ((prev: boolean) => boolean)) => void;
  setVolume: (patch: number | ((prev: number) => number)) => void;
  setPreset: (patch: SoundPreset | ((prev: SoundPreset) => SoundPreset)) => void;
  setPreferences: (
    patch: Partial<SoundPreferences> | ((prev: SoundPreferences) => Partial<SoundPreferences>),
  ) => void;
}

export const [SoundEffectsContext, useSoundEffects] = createContext<UseSoundEffectsReturn>({
  name: 'SoundEffectsContext',
  hookName: 'useSoundEffects',
  providerName: 'SoundEffects.Provider',
});

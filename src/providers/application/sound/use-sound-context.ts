'use client';

import type { SoundName, sounds } from 'cuelume';

import { createContext } from '@ark-ui/react';

export type UseSoundContext = {
  state: SoundState;
  sounds: typeof sounds;
  setVolume: (volume?: number) => void;
  setEnabled: (enabled?: boolean) => void;
  play: ((sound?: SoundName) => void) & PlayEvents;
};

export type SoundState = {
  volume: number;
  enabled: boolean;
};

export type PlayEvents = Record<SoundName, PlayHandler>;
export type PlayHandler = <A extends any[]>(
  callback: (...args: A) => void,
) => (...args: A) => void;

export const [SoundContextProvider, useSoundContext] = createContext<UseSoundContext>({
  strict: true,
  name: 'SoundContext',
  hookName: 'useSoundContext',
  providerName: '<SoundProvider />',
});

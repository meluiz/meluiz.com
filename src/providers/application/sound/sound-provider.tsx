'use client';

import {
  play as $play,
  setEnabled as $setEnabled,
  setVolume as $setVolume,
  type SoundName,
  sounds,
} from 'cuelume';
import Cookies from 'js-cookie';
import { Duration } from 'luxon';
import React from 'react';

import { type PlayEvents, SoundContextProvider, type SoundState } from './use-sound-context';

export const SOUND_COOKIE = 'prefers-sound';

const EXPIRES_DAYS = Duration.fromObject({ years: 1 }).as('days');

/* ///////////////////////////////////////////////// */

const writeCookie = (name: string, value: SoundState) => {
  Cookies.set(name, JSON.stringify(value), {
    path: '/',
    sameSite: 'lax',
    expires: EXPIRES_DAYS,
  });
};

/* ///////////////////////////////////////////////// */

export type SoundProviderProps = React.PropsWithChildren<{
  value: SoundState;
}>;

export const SoundProvider = (props: SoundProviderProps) => {
  const { value, children } = props;

  const [state, setState] = React.useState<SoundState>(value);

  const setEnabled = (enabled?: boolean) => {
    const resolvedEnabled = enabled ?? !state.enabled;
    const next = { ...state, enabled: resolvedEnabled };

    writeCookie(SOUND_COOKIE, next);
    setState(next);
  };

  const setVolume = (volume?: number) => {
    const resolvedVolume = Math.max(0, Math.min(1, volume ?? state.volume));
    const next = { ...state, volume: resolvedVolume };

    writeCookie(SOUND_COOKIE, next);
    setState(next);
  };

  const play = Object.assign(
    (sound: SoundName = 'tick') => $play(sound),
    Object.fromEntries(
      sounds.map((name) => [
        name,
        <A extends any[]>(callback: (...args: A) => void) => {
          return (...args: A) => {
            $play(name);
            callback(...args);
          };
        },
      ]),
    ) as PlayEvents,
  );

  React.useEffect(() => {
    $setVolume(state.volume);
    $setEnabled(state.enabled);
  }, [state]);

  return (
    <SoundContextProvider
      value={{
        play,
        state,
        sounds,
        setVolume,
        setEnabled,
      }}
    >
      {children}
    </SoundContextProvider>
  );
};

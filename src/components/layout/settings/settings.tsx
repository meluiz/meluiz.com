'use client';

import type { PointerEvent } from 'react';

import { Tooltip } from '@base-ui/react';
import { useState } from 'react';

import { useColorScheme, useSoundEffects } from '@/components/providers';
import { dataAttr } from '@/utils/dom';
import { clamp, cycle } from '@/utils/helpers';

import { HINT_HANDLE, VOLUME_BARS, VOLUME_KEYS, VOLUME_STEP } from './settings.constants';
import {
  arrows,
  bar,
  hint,
  hintPopup,
  hintViewport,
  label,
  meter,
  readout,
  value,
} from './settings.styles';

/* ///////////////////////////////////////////////// */

const toLevel = (level: number) => {
  return clamp(Math.round(level / VOLUME_STEP) * VOLUME_STEP, { min: 0, max: 100 });
};

/* ///////////////////////////////////////////////// */

export const Hint = () => {
  return (
    <Tooltip.Root handle={HINT_HANDLE}>
      {({ payload }) => (
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8} className={hint()}>
            <Tooltip.Popup className={hintPopup()}>
              <Tooltip.Viewport className={hintViewport()}>{payload}</Tooltip.Viewport>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      )}
    </Tooltip.Root>
  );
};

/* ///////////////////////////////////////////////// */

export const Theme = () => {
  const { theme, themes, setTheme } = useColorScheme();
  const { play } = useSoundEffects();

  return (
    <Tooltip.Trigger
      handle={HINT_HANDLE}
      payload="Click · cycle theme"
      aria-label={`Theme: ${theme}`}
      className={readout()}
      onClick={() => {
        setTheme(cycle(themes, theme));
        play.select();
      }}
    >
      <span className={label()}>Theme</span>
      <span key={theme} className={value({ bracketed: true })}>
        {theme}
      </span>
    </Tooltip.Trigger>
  );
};

/* ///////////////////////////////////////////////// */

export const Sound = () => {
  const { enabled, play, setEnabled } = useSoundEffects();

  const state = enabled ? 'on' : 'off';

  return (
    <Tooltip.Trigger
      handle={HINT_HANDLE}
      payload="Click · on / off"
      aria-label={`Sound: ${state}`}
      className={readout()}
      onClick={() => {
        setEnabled(!enabled);
        play.toggle();
      }}
    >
      <span className={label()}>Sound</span>
      <span key={state} className={value({ bracketed: true })}>
        {state}
      </span>
    </Tooltip.Trigger>
  );
};

/* ///////////////////////////////////////////////// */

export interface VolumeProps {
  nudge?: boolean;
}

export const Volume = (props: VolumeProps) => {
  const { nudge = false } = props;

  const { enabled, volume, play, setVolume } = useSoundEffects();
  const [draft, setDraft] = useState<number | null>(null);

  const level = draft ?? Math.round(volume * 100);

  const fromPointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return toLevel(((event.clientX - rect.left) / rect.width) * 100);
  };

  const tick = (next: number) => {
    if (next !== level) {
      play.select(undefined, { direction: next > level ? 'forward' : 'back' });
    }
  };

  const preview = (next: number) => {
    tick(next);
    setDraft(next);
  };

  const commit = (next: number) => {
    tick(next);
    setDraft(null);
    setVolume(next / 100);
  };

  const handleRelease = () => {
    if (draft !== null) {
      commit(draft);
    }
  };

  return (
    <Tooltip.Trigger
      handle={HINT_HANDLE}
      payload="Drag ↔ · or ← →"
      render={<div />}
      role="slider"
      tabIndex={0}
      aria-label="Volume"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={level}
      aria-valuetext={`${level}%`}
      aria-disabled={!enabled}
      className={readout({ scrub: true })}
      onPointerDown={(event) => {
        if (!enabled) {
          return;
        }

        event.currentTarget.setPointerCapture(event.pointerId);
        preview(fromPointer(event));
      }}
      onPointerMove={(event) => {
        if (draft !== null) {
          preview(fromPointer(event));
        }
      }}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onKeyDown={(event) => {
        const delta = VOLUME_KEYS[event.key];

        if (!enabled || delta === undefined) {
          return;
        }

        event.preventDefault();
        commit(toLevel(level + delta));
      }}
    >
      <span aria-hidden className={arrows()}>
        <span>‹</span>
        <span>›</span>
      </span>
      <span className={label()}>Volume</span>
      <span className={value()}>
        {String(level).padStart(3, ' ')}
        <span aria-hidden data-nudge={dataAttr(nudge)} className={meter()}>
          {Array.from({ length: VOLUME_BARS }, (_, index) => (
            <b
              key={index}
              data-on={dataAttr(index < Math.round((level / 100) * VOLUME_BARS))}
              className={bar()}
            />
          ))}
        </span>
      </span>
    </Tooltip.Trigger>
  );
};

/* ///////////////////////////////////////////////// */

export const Preset = () => {
  const { enabled, preset, presets, play, setPreset } = useSoundEffects();

  return (
    <Tooltip.Trigger
      handle={HINT_HANDLE}
      payload="Click · next preset"
      aria-label={`Preset: ${preset}`}
      aria-disabled={!enabled}
      className={readout()}
      onClick={() => {
        if (!enabled) {
          return;
        }

        setPreset(cycle(presets, preset));
        play.select();
      }}
    >
      <span className={label()}>Preset</span>
      <span key={preset} className={value({ bracketed: true })}>
        {preset}
      </span>
    </Tooltip.Trigger>
  );
};

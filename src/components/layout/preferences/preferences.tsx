'use client';

import { Toggle } from '@base-ui/react';
import { IconMoon, IconSun, IconVolumeFull, IconVolumeOff } from '@central-icons/filled-sharp';
import { toSentenceCase } from '@motiro/string';

import { useColorScheme, useSoundEffects } from '@/components/providers';
import { Button, Swap } from '@/components/ui';

import { indicator } from './preferences.styles';

export const SoundToggler = () => {
  const { enabled, play, setEnabled } = useSoundEffects();

  return (
    <Toggle
      pressed={enabled}
      aria-label="Sound"
      render={<Button variant="ghost" size="xsmall" />}
      onPressedChange={play.toggle(() => {
        setEnabled((prev) => !prev);
      })}
    >
      <Swap.Root swap={enabled} className="-mx-0.5 size-3.5 text-foreground">
        <Swap.Indicator type="on" className={indicator({ animation: 'swing' })}>
          <IconVolumeFull />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={indicator({ animation: 'swing' })}>
          <IconVolumeOff />
        </Swap.Indicator>
      </Swap.Root>
      <span className="brackets min-w-10 font-mono uppercase brackets-0.5 brackets-foreground in-data-pressed:text-foreground-accent">
        {enabled ? 'on' : 'off'}
      </span>
    </Toggle>
  );
};

/* ///////////////////////////////////////////////// */

export const ThemeToggler = () => {
  const { theme, setTheme } = useColorScheme();
  const { play } = useSoundEffects();

  return (
    <Toggle
      pressed={theme === 'dark'}
      aria-label="Dark theme"
      render={<Button variant="ghost" size="xsmall" />}
      onPressedChange={play.toggle(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      })}
    >
      <Swap.Root swap={theme === 'dark'} className="-mx-0.5 size-3.5 text-foreground">
        <Swap.Indicator type="on" className={indicator({ animation: 'dial' })}>
          <IconMoon />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={indicator({ animation: 'dial' })}>
          <IconSun />
        </Swap.Indicator>
      </Swap.Root>

      <span className="brackets inline-flex min-w-14 center font-mono uppercase brackets-0.5 brackets-foreground">
        {toSentenceCase(theme)}
      </span>
    </Toggle>
  );
};

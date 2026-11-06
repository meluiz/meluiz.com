'use client';

import { Toggle } from '@base-ui/react';
import { IconMoon, IconSun, IconVolumeFull, IconVolumeOff } from '@central-icons/filled-sharp';
import { toSentenceCase } from '@motiro/string';

import { useColorScheme, useSoundEffects } from '@/components/providers';
import { Button, Swap } from '@/components/ui';
import { useHydrated } from '@/hooks/lifecycle';

import { fallback, indicator, label } from './preferences.styles';

/* ///////////////////////////////////////////////// */

// Pages are static, so the server can't know the stored preferences. Until hydration, the
// toggles render every state and let the attributes the inline scripts put on <html> pick one

const ThemeIconFallback = () => {
  const styles = fallback();

  return (
    <span className={styles.root}>
      <span className={`${styles.indicator} hidden in-data-[theme=dark]:inline-flex`}>
        <IconMoon />
      </span>
      <span className={`${styles.indicator} inline-flex in-data-[theme=dark]:hidden`}>
        <IconSun />
      </span>
    </span>
  );
};

const ThemeLabelFallback = () => {
  return (
    <>
      <span className="in-data-[theme=dark]:hidden in-data-[theme=light]:hidden">System</span>
      <span className="hidden in-data-[theme=light]:inline">Light</span>
      <span className="hidden in-data-[theme=dark]:inline">Dark</span>
    </>
  );
};

const SoundIconFallback = () => {
  const styles = fallback();

  return (
    <span className={styles.root}>
      <span className={`${styles.indicator} hidden in-data-[sound=on]:inline-flex`}>
        <IconVolumeFull />
      </span>
      <span className={`${styles.indicator} inline-flex in-data-[sound=on]:hidden`}>
        <IconVolumeOff />
      </span>
    </span>
  );
};

const SoundLabelFallback = () => {
  return (
    <>
      <span className="hidden in-data-[sound=on]:inline">on</span>
      <span className="in-data-[sound=on]:hidden">off</span>
    </>
  );
};

/* ///////////////////////////////////////////////// */

export const SoundToggler = () => {
  const { enabled, play, setEnabled } = useSoundEffects();

  const hydrated = useHydrated();

  return (
    <Toggle
      pressed={enabled}
      aria-label="Sound"
      render={<Button variant="ghost" size="xsmall" />}
      onPressedChange={play.toggle(() => {
        setEnabled((prev) => !prev);
      })}
    >
      {hydrated ? (
        <Swap.Root swap={enabled} className="-mx-0.5 size-3.5 text-foreground">
          <Swap.Indicator type="on" className={indicator({ animation: 'swing' })}>
            <IconVolumeFull />
          </Swap.Indicator>
          <Swap.Indicator type="off" className={indicator({ animation: 'swing' })}>
            <IconVolumeOff />
          </Swap.Indicator>
        </Swap.Root>
      ) : (
        <SoundIconFallback />
      )}
      <span
        className={label({
          className: hydrated
            ? 'in-data-pressed:text-foreground-accent'
            : 'in-data-[sound=on]:text-foreground-accent',
        })}
      >
        {hydrated ? enabled ? 'on' : 'off' : <SoundLabelFallback />}
      </span>
    </Toggle>
  );
};

/* ///////////////////////////////////////////////// */

export const ThemeToggler = () => {
  const { theme, setTheme } = useColorScheme();
  const { play } = useSoundEffects();

  const hydrated = useHydrated();

  return (
    <Toggle
      pressed={theme === 'dark'}
      aria-label="Dark theme"
      render={<Button variant="ghost" size="xsmall" />}
      onPressedChange={play.toggle(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      })}
    >
      {hydrated ? (
        <Swap.Root swap={theme === 'dark'} className="-mx-0.5 size-3.5 text-foreground">
          <Swap.Indicator type="on" className={indicator({ animation: 'dial' })}>
            <IconMoon />
          </Swap.Indicator>
          <Swap.Indicator type="off" className={indicator({ animation: 'dial' })}>
            <IconSun />
          </Swap.Indicator>
        </Swap.Root>
      ) : (
        <ThemeIconFallback />
      )}

      <span className="brackets inline-flex min-w-14 center font-mono uppercase brackets-0.5 brackets-foreground">
        {hydrated ? toSentenceCase(theme) : <ThemeLabelFallback />}
      </span>
    </Toggle>
  );
};

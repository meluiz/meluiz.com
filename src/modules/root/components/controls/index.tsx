'use client';

import { IconMoonFill18, IconSunFill18, IconVolumeUpFill18 } from 'nucleo-ui-fill-18';
import { match } from 'ts-pattern';

import { Button } from '@/components/ui';
import { useSoundContext, useThemeContext } from '@/providers/application';

export const Controls = () => {
  const { resolved, setTheme } = useThemeContext();
  const { play, state, setEnabled } = useSoundContext();

  return (
    <div className="center-end relative flex gap-x-0.5">
      <Button.Root
        variant="ghost"
        size="xsmall"
        aria-label="toggle theme"
        onClick={play.tick(() => setTheme())}
      >
        {match(resolved)
          .with('dark', () => <IconMoonFill18 className="max-sm:hidden" />)
          .with('light', () => <IconSunFill18 className="max-sm:hidden" />)
          .exhaustive()}
        <Button.Label>
          [
          <span className="inline-block min-w-10.5 text-center text-foreground-soft sm:min-w-9">
            {resolved}
          </span>
          ]
        </Button.Label>
      </Button.Root>
      <Button.Root
        variant="ghost"
        size="xsmall"
        aria-label="toggle sound"
        aria-pressed={state.enabled}
        onClick={play.tick(() => setEnabled())}
      >
        <IconVolumeUpFill18 className="max-sm:hidden" />
        <Button.Label>
          [
          <span className="inline-block min-w-6.5 text-clay-500 sm:min-w-5.5 dark:text-clay-400">
            {state.enabled ? 'ON' : 'OFF'}
          </span>
          ]
        </Button.Label>
      </Button.Root>
    </div>
  );
};

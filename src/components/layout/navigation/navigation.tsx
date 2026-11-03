'use client';

import { Toolbar, Tooltip } from '@base-ui/react';
import { IconCrossMedium, IconVariables } from '@central-icons/outlined-sharp';
import { useState } from 'react';

import { useSoundEffects } from '@/components/providers';
import { Button, button, Dock } from '@/components/ui';
import { useMeasure } from '@/hooks/sensors';
import { socialChannels } from '@/modules/profile';

import { Settings } from '../settings';
import { CHANNEL_ICONS, SETTINGS_PANEL } from './navigation.constants';
import { navigation as navigationStyles } from './navigation.styles';

export const Navigation = () => {
  const [value, setValue] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const { play } = useSoundEffects();

  const [listRef, listMeasure] = useMeasure();
  const [settingsRef, settingsMeasure] = useMeasure();

  const styles = navigationStyles();

  const listOpen = value === null;
  const settingsOpen = value === SETTINGS_PANEL;

  const width = listOpen ? listMeasure?.width : settingsMeasure?.width;

  const handleValueChange = (next: string | null) => {
    setValue(next);

    if (next === null) {
      play.close();
      return;
    }

    play.open();

    if (next === SETTINGS_PANEL) {
      setOpened(true);
    }
  };

  return (
    <Dock.Positioner>
      <Dock.Root value={value} onValueChange={handleValueChange}>
        <div style={{ width }} className={styles.faces}>
          <Dock.List ref={listRef} hidden={false} inert={!listOpen} className={styles.face}>
            {socialChannels.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.id];

              return (
                <Dock.Item
                  key={channel.id}
                  render={
                    <Toolbar.Link
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${channel.name} (opens in a new tab)`}
                      className={button.root({
                        variant: 'ghost',
                        size: 'large',
                        compact: true,
                      })}
                    />
                  }
                >
                  {Icon && <Icon />}
                </Dock.Item>
              );
            })}
            <Dock.Separator />
            <Dock.Trigger
              value={SETTINGS_PANEL}
              aria-label="Settings"
              render={<Button variant="ghost" size="large" compact />}
            >
              <IconVariables />
            </Dock.Trigger>
          </Dock.List>

          <Dock.Panel
            value={SETTINGS_PANEL}
            keepMounted
            ref={settingsRef}
            hidden={false}
            inert={!settingsOpen}
            className={styles.face}
          >
            <Tooltip.Provider delay={150} closeDelay={100}>
              <div className={styles.track}>
                <Settings.Theme />
                <Settings.Sound />
                <Settings.Volume nudge={opened} />
                <Settings.Preset />
              </div>
              <Settings.Hint />
            </Tooltip.Provider>
            <Dock.Separator orientation="vertical" />
            <Dock.Close
              aria-label="Close settings"
              render={<Button variant="ghost" size="large" compact />}
            >
              <IconCrossMedium />
            </Dock.Close>
          </Dock.Panel>
        </div>
      </Dock.Root>
    </Dock.Positioner>
  );
};

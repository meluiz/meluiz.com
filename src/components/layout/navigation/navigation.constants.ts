import type { CentralIconBaseProps } from '@central-icons/outlined-sharp';
import type { Dict } from '@motiro/types';
import type React from 'react';

import { IconGithub, IconLinkedin, IconX } from '@central-icons/outlined-sharp';

export const SETTINGS_PANEL = 'settings';

export const CHANNEL_ICONS: Dict<React.NamedExoticComponent<CentralIconBaseProps>> = {
  github: IconGithub,
  linkedin: IconLinkedin,
  x: IconX,
};

'use client';

import { IconGithub, IconLinkedin, IconXTwitter } from 'nucleo-social-media';

import { Dock } from '@/components/layout';

export const navigation = Dock.defineDockCollection([
  {
    value: 'root',
    groups: [
      {
        name: 'actions',
        items: [
          {
            type: 'link',
            href: 'https://github.com/meluiz',
            label: 'github',
            icon: IconGithub,
          },
          {
            type: 'link',
            href: 'https://linkedin.com/in/meluiz',
            label: 'linkedin',
            icon: IconLinkedin,
          },
          {
            type: 'link',
            href: 'https://twitter.com/omeluiz',
            label: 'twitter',
            icon: IconXTwitter,
          },
        ],
      },
    ],
  },
]);

export const Navigation = () => {
  return (
    <Dock.Positioner>
      <Dock.Content collection={navigation} />
    </Dock.Positioner>
  );
};

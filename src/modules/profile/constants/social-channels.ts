import { freeze } from '@/utils/helpers';

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  href: string;
}

export const socialChannels = freeze<SocialChannel[]>([
  {
    id: 'github',
    name: 'GitHub',
    handle: 'meluiz',
    href: 'https://github.com/meluiz',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'in/meluiz',
    href: 'https://www.linkedin.com/in/meluiz',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@omeluiz',
    href: 'https://x.com/omeluiz',
  },
]);

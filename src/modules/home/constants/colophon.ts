import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { buildInfo, github, stacks } from '@/utils/constants';
import { freeze } from '@/utils/helpers';

export const colophons = freeze({
  fields: [
    {
      label: 'Crafted by',
      value: '@omeluiz',
      href: 'https://x.com/omeluiz',
    },
    {
      label: 'Build',
      value: buildInfo.commit?.shortSha ?? '',
      href: buildInfo.commit?.url,
    },
    {
      label: 'Date',
      value: DateTime.fromISO(env.BUILD_TIMESTAMP).toFormat('yyyy-MM-dd'),
    },
    {
      label: 'Location',
      value: 'Brazil',
    },
    {
      label: 'Deployed at',
      value: '▲',
    },
    {
      label: 'Source code',
      value: 'GitHub',
      href: `${github.repo_url}`,
    },
    {
      label: 'License',
      value: 'MIT License',
      href: `${github.repo_url}/blob/main/LICENSE`,
    },
    {
      label: 'Typeface',
      value: 'Geist',
    },
  ],
  stacks: [
    {
      label: 'Stack',
      value: stacks.map(({ name, version }) => ({
        label: `${name}@${version}`,
      })),
    },
    {
      label: 'Analytics',
      value: [
        {
          label: 'Vercel Analytics',
          href: 'https://vercel.com/analytics',
        },
        {
          label: 'Cloudflare Analytics',
          href: 'https://cloudflare.com/analytics',
        },
      ],
    },
  ],
  inspiration: [
    {
      label: 'Content Architecture',
      href: 'https://www.contentarchitecture.dev',
    },
    {
      label: 'Chánh Đại',
      href: 'https://www.contentarchitecture.dev',
    },
    {
      label: 'Murat Alpay',
      href: 'https://muratalpay.me',
    },
    {
      label: 'Tailwind CSS',
      href: 'https://tailwindcss.com',
    },
    {
      label: 'Coss UI',
      href: 'https://coss.com/ui',
    },
  ],
});

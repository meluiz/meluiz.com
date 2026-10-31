import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { buildInfo, github, stacks } from '@/constants/source';
import { freeze } from '@/utils/helpers';

/* ///////////////////////////////////////////////// */

export interface ColophonLink {
  label: string;
  href: string;
}

export interface ColophonSpecification {
  label: string;
  value: string;
  href?: string;
}

export interface ColophonService {
  label: string;
  href?: string;
}

export interface Colophon {
  specs: ColophonSpecification[];
  stacks: string[];
  analytics: ColophonService[];
  inspirations: ColophonLink[];
}

/* ///////////////////////////////////////////////// */

const buildDate = DateTime.fromISO(env.BUILD_TIMESTAMP, { zone: 'utc' });

if (!buildDate.isValid) {
  throw new Error(
    `Invalid BUILD_TIMESTAMP: "${env.BUILD_TIMESTAMP}" (${buildDate.invalidReason})`,
  );
}

/* ///////////////////////////////////////////////// */

export const colophon: Colophon = freeze({
  specs: [
    {
      label: 'Crafted by',
      value: '@omeluiz',
      href: 'https://x.com/omeluiz',
    },
    {
      label: 'Build',
      value: buildInfo.commit?.shortSha ?? '000-dev',
      href: buildInfo.commit?.url,
    },
    {
      label: 'Date',
      value: buildDate.toISODate(),
    },
    {
      label: 'Location',
      value: 'Brazil',
    },
    {
      label: 'Deployed at',
      value: 'Vercel',
      href: 'https://vercel.com',
    },
    {
      label: 'Source code',
      value: 'GitHub',
      href: github.repo_url,
    },
    {
      label: 'License',
      value: 'MIT License',
      href: github.license,
    },
    {
      label: 'Typeface',
      value: 'Geist',
    },
  ],
  stacks: stacks.map(({ name, version }) => `${name}@${version}`),
  analytics: [
    { label: 'Self-hosted' },
    {
      label: 'Vercel Analytics',
      href: 'https://vercel.com/analytics',
    },
    {
      label: 'Cloudflare Analytics',
      href: 'https://cloudflare.com/analytics',
    },
  ],
  inspirations: [
    {
      label: 'Content Architecture',
      href: 'https://www.contentarchitecture.dev',
    },
    {
      label: 'Chánh Đại',
      href: 'https://chanhdai.com',
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

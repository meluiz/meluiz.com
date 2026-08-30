import type { Dict } from '@motiro/types';

import { env } from 'envin/env';

import manifest from '../../../package.json' with { type: 'json' };
import { freeze } from '../helpers';
import { github } from './socials';

const SHORT_SHA_LENGTH = 7;
const SEMVER = /(\d+\.\d+\.\d+(?:[-+][\w.]+)?)/;

const ENVIRONMENT = env.VERCEL_ENV ?? 'development';
const COMMIT_SHA = env.VERCEL_GIT_COMMIT_SHA ?? null;
const BUILD_TIMESTAMP = env.BUILD_TIMESTAMP;

const STACK_DEPENDENCIES = [
  'next',
  'react',
  'tailwindcss',
  '@ark-ui/react',
  'typescript',
] as const;

const DECLARED_VERSIONS: Dict<string | undefined> = {
  ...manifest.dependencies,
  ...manifest.devDependencies,
};

/* ///////////////////////////////////////////////// */

const resolveCommit = (sha: string | null) => {
  if (sha == null) {
    return null;
  }

  return freeze({
    sha,
    shortSha: sha.slice(0, SHORT_SHA_LENGTH),
    url: `${github.repo_url}/commit/${sha}`,
  });
};

/* ///////////////////////////////////////////////// */

export const buildInfo = freeze({
  date: BUILD_TIMESTAMP,
  environment: ENVIRONMENT,
  commit: resolveCommit(COMMIT_SHA),
});

export const stacks = freeze(
  STACK_DEPENDENCIES.flatMap((name) => {
    const version = DECLARED_VERSIONS[name]?.match(SEMVER)?.[1];
    return version ? [{ name, version }] : [];
  }),
);

/* ///////////////////////////////////////////////// */

export const projects = freeze([
  {
    name: 'Motiro',
    description:
      'Tree-shakeable TypeScript utilities for strings, numbers and collections. Import only what you use.',
    stacks: ['Bun', 'Typescript'],
    links: [
      {
        type: 'repository',
        href: `${github.url}/motiro`,
      },
    ],
  },
  {
    name: 'Unique ID Generator',
    description:
      'Generate UUID, CUID2, Nano ID and ULID in the browser. Nothing ever leaves your machine.',
    stacks: ['Void', 'React.js', 'Typescript'],
    links: [
      {
        type: 'website',
        href: `https://uidg.meluiz.com`,
      },
      {
        type: 'repository',
        href: `${github.url}/uidg`,
      },
    ],
  },
  {
    name: 'Tailugin',
    description: 'Extra utilities and theme tokens for Tailwind CSS v4, as a drop-in plugin.',
    stacks: ['Tailwind'],
    links: [
      {
        type: 'repository',
        href: `${github.url}/tailugin`,
      },
    ],
  },
]);

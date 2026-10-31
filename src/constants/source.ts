import type { Dict } from '@motiro/types';

import { env } from 'envin/env';

import { freeze, resolveCommit } from '@/utils/helpers';

import manifest from '../../package.json' with { type: 'json' };

/* ///////////////////////////////////////////////// */

const ENVIRONMENT = env.VERCEL_ENV ?? 'development';
const COMMIT_SHA = env.VERCEL_GIT_COMMIT_SHA ?? null;

const STACK_DEPENDENCIES = [
  '@base-ui/react',
  'next',
  'react',
  'tailwindcss',
  'typescript',
] as const;

const DECLARED_VERSIONS: Dict<string | undefined> = {
  ...manifest.dependencies,
  ...manifest.devDependencies,
};

/* ///////////////////////////////////////////////// */

export const github = freeze({
  url: 'https://github.com/meluiz',
  repo_url: 'https://github.com/meluiz/meluiz.com',
  license: 'https://github.com/meluiz/meluiz.com/blob/main/LICENSE',
});

export const buildInfo = freeze({
  date: env.BUILD_TIMESTAMP,
  environment: ENVIRONMENT,
  commit: resolveCommit(COMMIT_SHA, github.repo_url),
});

export const stacks = freeze(
  STACK_DEPENDENCIES.flatMap((name) => {
    const version = DECLARED_VERSIONS[name]?.replace(/^[^\d]*/, '');

    return version ? [{ name, version }] : [];
  }),
);

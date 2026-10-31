import type { AtLastOne } from '@/types/collection';

import { freeze } from '@/utils/helpers';

export type ProjectStack =
  | 'TypeScript'
  | 'Bun'
  | 'tsdown'
  | 'Vitest'
  | 'CSS'
  | 'React'
  | 'Next.js'
  | 'Void'
  | 'Hono'
  | 'Tailwind CSS'
  | 'Dexie'
  | 'Drizzle'
  | 'PostgreSQL'
  | 'Better Auth';

export interface Project {
  id: string;
  name: string;
  description: string;
  links: AtLastOne<ProjectLink>;
  stacks: ProjectStack[];
}

export interface ProjectLink {
  website?: string;
  source?: string;
}

export const projects = freeze<Project[]>([
  {
    id: 'motiro',
    name: 'Motiro',
    description:
      'Tree-shakeable TypeScript utilities for strings, numbers and collections. Import only what you use.',
    stacks: ['TypeScript', 'Bun', 'tsdown', 'Vitest'],
    links: {
      source: 'https://github.com/meluiz/motiro',
    },
  },
  {
    id: 'uidg',
    name: 'Unique ID Generator',
    description:
      'Generate UUID, CUID2, Nano ID and ULID in the browser. Nothing ever leaves your machine.',
    stacks: ['Void', 'React', 'TypeScript', 'Tailwind CSS'],
    links: {
      website: 'https://uidg.meluiz.com',
      source: 'https://github.com/meluiz/uidg',
    },
  },
  {
    id: 'tailugin',
    name: 'Tailugin',
    description: 'Extra utilities and theme tokens for Tailwind CSS v4, as a drop-in plugin.',
    stacks: ['Tailwind CSS', 'CSS'],
    links: {
      source: 'https://github.com/meluiz/tailugin',
    },
  },
  {
    id: 'kuati',
    name: 'Kuati',
    description:
      'A comic reader that keeps series, collections and bookmarks on one shelf, with import and search a shortcut away.',
    stacks: ['Void', 'React', 'TypeScript', 'Tailwind CSS', 'Dexie'],
    links: {
      website: 'https://kuati.meluiz.dev',
    },
  },
  {
    id: 'hookscope',
    name: 'Hookscope',
    description:
      'Capture, inspect and replay webhooks. Point a provider at an inbox URL and resend any request to your own endpoint.',
    stacks: ['Next.js', 'Hono', 'TypeScript', 'Drizzle', 'PostgreSQL', 'Better Auth'],
    links: {
      website: 'https://hookscope.meluiz.dev',
    },
  },
]);

import type { CraftTag } from '../utils';

import { slug as slugify } from '@motiro/string';

import { crafts as collection } from '#collections/server';
import generatedSpecs from '#collections/specs.json' with { type: 'json' };
import { github } from '@/constants/source';

import { matchesCraftTags } from '../utils';

/* ///////////////////////////////////////////////// */

type CollectionItem = (typeof collection)[number];

export type { CraftTag };

export interface CraftItem extends CollectionItem {
  slug: string;
  preview: React.ComponentType | null;
}

/* ///////////////////////////////////////////////// */

// Computed at build time by `bin/specs.ts`, keyed by each craft's `source`
const sourceSpecs: Record<string, { label: string; value: string }[] | undefined> =
  generatedSpecs;

/* ///////////////////////////////////////////////// */

const toSlug = (path: string) => {
  return slugify(path.split('/')[0]);
};

const isPublished = (entry: CollectionItem) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return entry.status !== 'draft';
};

const getPreviewFromItem = (craft: CollectionItem) => {
  const preview = craft._exports.Preview;

  if (typeof preview !== 'function') {
    return null;
  }

  return preview as React.ComponentType;
};

const getSpecsFromItem = (craft: CollectionItem) => {
  const generated = craft.source ? (sourceSpecs[craft.source] ?? []) : [];
  const isSameSpec = (a: { label: string }, b: { label: string }) => {
    return a.label.toLowerCase() === b.label.toLowerCase();
  };

  const computed = generated.map((spec) => {
    return craft.specs.find((custom) => isSameSpec(custom, spec)) ?? spec;
  });
  const extras = craft.specs.filter((custom) => {
    return !generated.some((spec) => isSameSpec(custom, spec));
  });

  return [...computed, ...extras];
};

const getParsedCrafts = (entries: CollectionItem[]) => {
  const publishedCrafts = entries.filter(isPublished);
  const normalizedCrafts = publishedCrafts.map((entry) => ({
    ...entry,
    slug: toSlug(entry.info.path),
    preview: getPreviewFromItem(entry),
    specs: getSpecsFromItem(entry),
  }));

  return normalizedCrafts.sort((a, b) => b.serial - a.serial);
};

/* ///////////////////////////////////////////////// */

const crafts: CraftItem[] = getParsedCrafts(collection);

export const getCraftBySlug = (slug: string) => {
  return crafts.find((craft) => craft.slug === slug);
};

export const getCraftList = () => {
  return crafts;
};

// A craft matches when it has at least one of the selected tags
export const getCraftsByTags = (selected: CraftTag[]) => {
  return crafts.filter((craft) => matchesCraftTags(craft.tags, selected));
};

export const getCraftStats = () => {
  const dates = crafts.map((craft) => craft.date).sort();

  return {
    total: crafts.length,
    since: dates.at(0)?.slice(0, 4) ?? null,
    latest: dates.at(-1) ?? null,
  };
};

export const getCraftPosition = (craft: CraftItem) => {
  return {
    position: crafts.findIndex((c) => c.slug === craft.slug) + 1,
    total: crafts.length,
  };
};

export const getCraftNeighbors = (craft: CraftItem) => {
  const index = crafts.findIndex((c) => c.slug === craft.slug);

  if (index === -1 || crafts.length < 2) {
    return null;
  }

  const total = crafts.length;

  return {
    next: crafts[(index + 1) % total],
    prev: crafts[(index - 1 + total) % total],
  };
};

export const getCraftSourceUrl = (craft: CraftItem) => {
  const path = craft.source ?? `content/crafts/${craft.slug}`;
  const url = new URL(github.repo_url);

  url.pathname = `${url.pathname.replace(/\/$/, '')}/tree/main/${path}`;

  return url.toString();
};

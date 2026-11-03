import { slug as slugify } from '@motiro/string';

import { crafts as collection } from '#collections/server';
import { github } from '@/constants/source';

/* ///////////////////////////////////////////////// */

type CollectionItem = (typeof collection)[number];

export interface CraftItem extends CollectionItem {
  slug: string;
  stage: React.ComponentType | null;
}

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

const getStageFromItem = (craft: CollectionItem) => {
  const stage = craft._exports.Stage;

  if (typeof stage !== 'function') {
    return null;
  }

  return stage as React.ComponentType;
};

const getParsedCrafts = (entries: CollectionItem[]) => {
  const publishedCrafts = entries.filter(isPublished);
  const normalizedCrafts = publishedCrafts.map((entry) => ({
    ...entry,
    slug: toSlug(entry.info.path),
    stage: getStageFromItem(entry),
  }));

  return normalizedCrafts.sort((a, b) => b.serial - a.serial);
};

/* ///////////////////////////////////////////////// */

const crafts: Craft[] = getParsedCrafts(collection);

export const getCraftBySlug = (slug: string) => {
  return crafts.find((craft) => craft.slug === slug);
};

export const getCraftList = () => {
  return crafts;
};

export const getCraftNeighbors = (slug: string) => {
  const index = crafts.findIndex((craft) => craft.slug === slug);

  if (index === -1 || crafts.length < 2) {
    return null;
  }

  const total = crafts.length;

  return {
    next: crafts[(index + 1) % total],
    prev: crafts[(index - 1 + total) % total],
  };
};

export const getCraftStage = (craft: Craft) => {
  const stage = craft._exports.Stage;

  if (typeof stage !== 'function') {
    return null;
  }

  return stage as React.ComponentType;
};

export const getCraftSourceUrl = (craft: Craft) => {
  const path = craft.source ?? `content/crafts/${craft.slug}`;
  const url = new URL(`/tree/main/${path}`, github.repo_url);

  return url.toString();
};

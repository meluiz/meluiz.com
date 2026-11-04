import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { slug as slugify } from '@motiro/string';

import { crafts as collection } from '#collections/server';
import { github } from '@/constants/source';

/* ///////////////////////////////////////////////// */

type CollectionItem = (typeof collection)[number];

export interface CraftItem extends CollectionItem {
  slug: string;
  preview: React.ComponentType | null;
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

const getPreviewFromItem = (craft: CollectionItem) => {
  const preview = craft._exports.Preview;

  if (typeof preview !== 'function') {
    return null;
  }

  return preview as React.ComponentType;
};

const getSourceFiles = (source: string) => {
  const path = join(process.cwd(), source);

  if (!existsSync(path)) {
    return [];
  }

  if (statSync(path).isFile()) {
    return [path];
  }

  return readdirSync(path, { encoding: 'utf8', recursive: true })
    .filter((file) => /\.tsx?$/.test(file))
    .map((file) => join(path, file));
};

const getBuiltWith = (code: string) => {
  const imports = code.matchAll(/^import\s+(?!type\b)[^;'"]*?from\s+['"]([^'"]+)['"]/gm);
  const specifiers = Array.from(imports, (match) => match[1]);
  const packages = specifiers
    .filter((specifier) => /^(?!node:|@\/)[@a-z]/.test(specifier))
    .map((specifier) => {
      const size = specifier.startsWith('@') ? 2 : 1;

      return specifier.split('/').slice(0, size).join('/');
    });

  return Array.from(new Set(packages)).sort().join(' · ');
};

const getAnatomy = (files: string[]) => {
  const file = files.find((path) => path.endsWith('.anatomy.ts'));

  if (file == null) {
    return '';
  }

  const definition = readFileSync(file, 'utf8').split('createAnatomy(')[1] ?? '';
  const [, ...names] = Array.from(definition.matchAll(/'([^']+)'/g), (match) => match[1]);

  return names
    .map((name) => name.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()))
    .join(' · ');
};

const getSize = (code: string) => {
  return `~${(gzipSync(code).byteLength / 1000).toFixed(1)} kB`;
};

const getSourceSpecs = (source: string) => {
  const files = getSourceFiles(source);

  if (files.length === 0) {
    return [];
  }

  const code = files.map((file) => readFileSync(file, 'utf8')).join('\n');
  const specs = [
    { label: 'Built with', value: getBuiltWith(code) },
    { label: 'Anatomy', value: getAnatomy(files) },
    { label: 'Size', value: getSize(code) },
  ];

  return specs.filter((spec) => spec.value !== '');
};

const getSpecsFromItem = (craft: CollectionItem) => {
  const sourceSpecs = craft.source ? getSourceSpecs(craft.source) : [];
  const isSameSpec = (a: { label: string }, b: { label: string }) => {
    return a.label.toLowerCase() === b.label.toLowerCase();
  };

  const computed = sourceSpecs.map((spec) => {
    return craft.specs.find((custom) => isSameSpec(custom, spec)) ?? spec;
  });
  const extras = craft.specs.filter((custom) => {
    return !sourceSpecs.some((spec) => isSameSpec(custom, spec));
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

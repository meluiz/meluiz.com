import { tags } from '../constants';

/* ///////////////////////////////////////////////// */

export type CraftTag = (typeof tags)[number];

/* ///////////////////////////////////////////////// */

export const isCraftTag = (value: string): value is CraftTag => {
  return tags.some((tag) => tag === value);
};

// Accepts ?tags=a,b and ?tags=a&tags=b; values outside the known tags are dropped
export const parseCraftTags = (value?: string | string[] | null) => {
  const values = [value ?? []].flat().flatMap((item) => item.split(','));
  const parsed = values.map((item) => item.trim().toLowerCase()).filter(isCraftTag);

  return Array.from(new Set(parsed));
};

// A craft matches when it has at least one of the selected tags
export const matchesCraftTags = (craftTags: readonly CraftTag[], selected: CraftTag[]) => {
  return selected.length === 0 || craftTags.some((tag) => selected.includes(tag));
};

export const toggleCraftTag = (selected: CraftTag[], tag: CraftTag) => {
  return selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
};

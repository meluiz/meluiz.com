'use client';

import type { Route } from 'next';
import type React from 'react';
import type { CraftTag } from '../../utils';

import { IconCrossSmall } from '@central-icons/outlined-sharp';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button, RuledGrid, Tag } from '@/components/ui';

import {
  formatCount,
  formatSerial,
  matchesCraftTags,
  parseCraftTags,
  toggleCraftTag,
} from '../../utils';
import { Playground } from '../playground';
import { card, filter, results } from './catalog.styles';

/* ///////////////////////////////////////////////// */

// The serializable slice of a craft the catalog needs; the preview arrives already rendered
export interface CatalogEntry {
  slug: string;
  serial: number;
  title: string;
  description: string;
  date: string;
  tags: CraftTag[];
  preview: React.ReactNode;
}

/* ///////////////////////////////////////////////// */

const getFilterHref = (tags: string[]): Route => {
  return tags.length > 0 ? `/crafts?tags=${tags.join(',')}` : '/crafts';
};

/* ///////////////////////////////////////////////// */

export interface FilterProps {
  tags: string[];
  count: number;
  total: number;
}

export const Filter = (props: FilterProps) => {
  const { tags, count, total } = props;

  const styles = filter();

  return (
    <div className={styles.root}>
      {tags.length > 0 ? (
        <div className={styles.group}>
          <p className={styles.label} aria-live="polite">
            Filtered by
          </p>
          <ul className={styles.list}>
            {tags.map((tag) => {
              const remaining = tags.filter((t) => t !== tag);

              return (
                <li key={tag} className={styles.item}>
                  {tag}
                  <Button
                    compact
                    size="small"
                    variant="link"
                    native={false}
                    aria-label={`Remove ${tag} filter`}
                    className={styles.remove}
                    render={<Link href={getFilterHref(remaining)} scroll={false} />}
                  >
                    <IconCrossSmall />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className={styles.label} aria-live="polite">
          Tap a tag on any craft to filter.
        </p>
      )}
      <span className={styles.count}>
        {formatCount(count)} of {formatCount(total)}
      </span>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export interface CardProps {
  craft: CatalogEntry;
  selected: CraftTag[];
}

export const Card = (props: CardProps) => {
  const { craft, selected } = props;

  const styles = card();

  return (
    <RuledGrid.Cell inset="none" className={styles.root} render={<article />}>
      <Playground.Stage className={styles.stage}>
        <span className={styles.serial}>{formatSerial(craft.serial)}</span>
        {craft.preview}
      </Playground.Stage>
      <div className={styles.meta}>
        <div className={styles.top}>
          <h2 className={styles.title}>
            <Link href={`/crafts/${craft.slug}`} className={styles.link}>
              {craft.title}
            </Link>
          </h2>
          <span className={styles.date}>{craft.date.slice(0, 7)}</span>
        </div>
        <p className={styles.description}>{craft.description}</p>
        <ul className={styles.tags} aria-label="Tags">
          {craft.tags.map((tag) => {
            const active = selected.includes(tag);

            return (
              <li key={tag}>
                <Tag
                  tone={active ? 'accent' : 'plain'}
                  className={styles.tag}
                  aria-current={active ? 'true' : undefined}
                  aria-label={active ? `Remove ${tag} filter` : `Filter by ${tag}`}
                  render={
                    <Link href={getFilterHref(toggleCraftTag(selected, tag))} scroll={false} />
                  }
                >
                  {tag}
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
    </RuledGrid.Cell>
  );
};

/* ///////////////////////////////////////////////// */

export interface ResultsProps {
  crafts: CatalogEntry[];
  selected: CraftTag[];
}

export const Results = (props: ResultsProps) => {
  const { crafts, selected } = props;

  const styles = results();

  if (crafts.length === 0) {
    return <p className={styles.empty}>No crafts on the bench yet</p>;
  }

  return (
    <RuledGrid.Root className={styles.root}>
      {crafts.map((craft) => (
        <Card key={craft.slug} craft={craft} selected={selected} />
      ))}
      {crafts.length % 2 === 1 && (
        <RuledGrid.Cell inset="none" aria-hidden="true" className={styles.filler}>
          Next craft on the bench
        </RuledGrid.Cell>
      )}
    </RuledGrid.Root>
  );
};

/* ///////////////////////////////////////////////// */

export interface RootProps {
  crafts: CatalogEntry[];
  selected: CraftTag[];
}

export const Root = (props: RootProps) => {
  const { crafts, selected } = props;

  const filtered = crafts.filter((craft) => matchesCraftTags(craft.tags, selected));

  return (
    <>
      <Filter tags={selected} count={filtered.length} total={crafts.length} />
      <Results crafts={filtered} selected={selected} />
    </>
  );
};

/* ///////////////////////////////////////////////// */

export interface SearchProps {
  crafts: CatalogEntry[];
}

// Reads the tags from the URL, so the page stays static and filtering happens on the client.
// Needs a <Suspense> boundary; render <Root selected={[]} /> as its fallback
export const Search = (props: SearchProps) => {
  const { crafts } = props;

  const params = useSearchParams();
  const selected = parseCraftTags(params.getAll('tags'));

  return <Root crafts={crafts} selected={selected} />;
};

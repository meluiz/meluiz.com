import type { Route } from 'next';
import type { CraftItem, CraftTag } from '../../services';

import { IconArrowLeft, IconArrowRight, IconCrossSmall } from '@central-icons/outlined-sharp';
import Link from 'next/link';

import { Button, DataList, RuledGrid, Tag } from '@/components/ui';

import { Playground } from '../playground';
import {
  card,
  filter,
  header,
  pager,
  results,
  specs as specsStyles,
  topbar,
} from './craft.styles';

const formatSerial = (serial: number) => {
  return `No. ${String(serial).padStart(3, '0')}`;
};

/* ///////////////////////////////////////////////// */

export interface TopbarProps {
  serial: number;
  position: number;
  total: number;
}

export const Topbar = (props: TopbarProps) => {
  const { serial, position, total } = props;

  const styles = topbar();

  return (
    <div className={styles.root}>
      <Button
        variant="ghost"
        className={styles.back}
        size="small"
        native={false}
        render={<Link href="/crafts" />}
      >
        <IconArrowLeft />
        Crafts
      </Button>
      <span className={styles.label}>
        {formatSerial(serial)} · {position} of {total}
      </span>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export interface HeaderProps {
  craft: CraftItem;
}

export const Header = (props: HeaderProps) => {
  const { craft } = props;

  const styles = header();

  return (
    <section className={styles.root} aria-labelledby="craft-title">
      <span className={styles.status}>
        <Tag className={styles.statusTag} tone="accent">
          Craft
        </Tag>
        <span className={styles.statusDate}>
          {formatSerial(craft.serial)} · {craft.date.slice(0, 7)}
        </span>
      </span>
      <div className={styles.content}>
        <h1 id="craft-title" className={styles.title}>
          {craft.title}
        </h1>
        <p className={styles.description}>{craft.description}</p>
      </div>
      <ul className={styles.tagsGroup} aria-label="Tags">
        {craft.tags.map((tag) => (
          <Tag key={tag} render={<li />}>
            {tag}
          </Tag>
        ))}
      </ul>
    </section>
  );
};

/* ///////////////////////////////////////////////// */

export interface SpecsProps {
  specs: CraftItem['specs'];
}

export const Specs = (props: SpecsProps) => {
  const { specs } = props;

  const styles = specsStyles();

  if (specs.length === 0) {
    return null;
  }

  return (
    <RuledGrid.Root className={styles.root} render={<DataList.Root className={styles.list} />}>
      {specs.map((spec) => (
        <RuledGrid.Cell key={spec.label} className={styles.item} render={<DataList.Item />}>
          <DataList.Term>{spec.label}</DataList.Term>
          <DataList.Details>{spec.value}</DataList.Details>
        </RuledGrid.Cell>
      ))}
    </RuledGrid.Root>
  );
};

/* ///////////////////////////////////////////////// */

export interface PagerProps {
  prev: CraftItem;
  next: CraftItem;
}

export const Pager = (props: PagerProps) => {
  const { prev, next } = props;

  const styles = pager();

  return (
    <nav className={styles.root} aria-label="More crafts">
      <Link href={`/crafts/${prev.slug}`} className={styles.trigger} rel="prev">
        <span className={styles.label}>
          <IconArrowLeft />
          Previous
        </span>
        <span className={styles.title}>{prev.title}</span>
      </Link>
      <Link href={`/crafts/${next.slug}`} className={styles.trigger} rel="next">
        <span className={styles.label}>
          Next
          <IconArrowRight />
        </span>
        <span className={styles.title}>{next.title}</span>
      </Link>
    </nav>
  );
};

/* ///////////////////////////////////////////////// */

const formatCount = (count: number) => {
  return String(count).padStart(2, '0');
};

const getFilterHref = (tags: string[]): Route => {
  return tags.length > 0 ? `/crafts?tags=${tags.join(',')}` : '/crafts';
};

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

const toggleTag = (tags: CraftTag[], tag: CraftTag) => {
  return tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
};

export interface CardProps {
  craft: CraftItem;
  selected: CraftTag[];
}

export const Card = (props: CardProps) => {
  const { craft, selected } = props;

  const styles = card();

  const Preview = craft.preview;

  return (
    <RuledGrid.Cell inset="none" className={styles.root} render={<article />}>
      <Playground.Stage className={styles.stage}>
        <span className={styles.serial}>{formatSerial(craft.serial)}</span>
        {Preview && <Preview />}
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
                    <Link href={getFilterHref(toggleTag(selected, tag))} scroll={false} />
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
  crafts: CraftItem[];
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

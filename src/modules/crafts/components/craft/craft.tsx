import type { CraftItem } from '../../services';

import { IconArrowLeft, IconArrowRight } from '@central-icons/outlined-sharp';
import Link from 'next/link';

import { Button, DataList, RuledGrid, Tag } from '@/components/ui';

import { formatSerial } from '../../utils';
import { header, pager, specs as specsStyles, topbar } from './craft.styles';

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

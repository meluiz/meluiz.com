import { IconArrowLeft, IconArrowRight } from '@central-icons/outlined-sharp';
import Link from 'next/link';

import { Button, DataList, RuledGrid, Tag } from '@/components/ui';

import { header, pager, topbar } from './craft.styles';

export const Topbar = () => {
  const styles = topbar();

  return (
    <div className={styles.root}>
      <Button
        variant="ghost"
        className="gap-x-2 font-mono uppercase"
        size="small"
        native={false}
        render={<Link href="/" />}
      >
        <IconArrowLeft />
        Crafts
      </Button>
      <span className={styles.label}>No. 006 · 2 of 7</span>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export const Header = () => {
  const styles = header();

  return (
    <section className={styles.root} aria-labelledby="craft-title">
      <span className={styles.status}>
        <Tag className={styles.statusTag} tone="accent">
          Craft
        </Tag>
        <span className={styles.statusDate}>No. 006 · 2026-11</span>
      </span>
      <div className={styles.content}>
        <h1 id="craft-title" className={styles.title}>
          Dock Morph
        </h1>
        <p className={styles.description}>
          A bottom dock that trades its links for settings, animating width instead of scale.
        </p>
      </div>
      <ul className={styles.tagsGroup} aria-label="Tags">
        <Tag render={<li />}>motion</Tag>
        <Tag render={<li />}>interaction</Tag>
      </ul>
    </section>
  );
};

/* ///////////////////////////////////////////////// */

export const Specs = () => {
  return (
    <RuledGrid.Root
      className="grid-cols-2 ring ring-stroke-soft sm:grid-cols-3"
      render={<DataList.Root className="horizontal:gap-px vertical:gap-px" />}
    >
      <RuledGrid.Cell render={<DataList.Item />}>
        <DataList.Term>Built With</DataList.Term>
        <DataList.Details>React · Motion</DataList.Details>
      </RuledGrid.Cell>
      <RuledGrid.Cell render={<DataList.Item />}>
        <DataList.Term>Anatomy</DataList.Term>
        <DataList.Details>Root · Bar · Face</DataList.Details>
      </RuledGrid.Cell>
      <RuledGrid.Cell className="max-sm:col-span-full" render={<DataList.Item />}>
        <DataList.Term>Size</DataList.Term>
        <DataList.Details>~2 kB</DataList.Details>
      </RuledGrid.Cell>
    </RuledGrid.Root>
  );
};

/* ///////////////////////////////////////////////// */

export const Pager = () => {
  const styles = pager();

  return (
    <nav className={styles.root} aria-label="More crafts">
      <Link href="/" className={styles.trigger} rel="prev">
        <span className={styles.label}>
          <IconArrowLeft />
          Previous
        </span>
        <span className={styles.title}>Scroll Ink</span>
      </Link>
      <Link href="/" className={styles.trigger} rel="next">
        <span className={styles.label}>
          Next
          <IconArrowRight />
        </span>
        <span className={styles.title}>Volume Readout</span>
      </Link>
    </nav>
  );
};

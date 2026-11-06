import type { Metadata } from 'next';
import type { CollectionPage, WithContext } from 'schema-dts';
import type { CatalogEntry, CraftItem } from '@/modules/crafts';

import env from 'envin/env';
import { Suspense } from 'react';

import { JsonLd } from '@/components/layout';
import { metadata as baseMetadata, structuredDataIds } from '@/constants/metadata';
import { Catalog, Masthead, Stats } from '@/modules/crafts';
import { getCraftList, getCraftStats } from '@/modules/crafts/services';

/* ///////////////////////////////////////////////// */

const toCatalogEntry = (craft: CraftItem): CatalogEntry => {
  const Preview = craft.preview;

  return {
    slug: craft.slug,
    serial: craft.serial,
    title: craft.title,
    description: craft.description,
    date: craft.date,
    tags: craft.tags,
    preview: Preview ? <Preview /> : null,
  };
};

/* ///////////////////////////////////////////////// */

// Static: every craft is prerendered and the ?tags= filter runs on the client
const Page = () => {
  const list = getCraftList();
  const crafts = list.map(toCatalogEntry);
  const stats = getCraftStats();

  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft sm:border-x">
      <section aria-labelledby="masthead-title" className="relative divide-y divide-stroke">
        <Masthead total={stats.total} />
        <Stats total={stats.total} since={stats.since} latest={stats.latest} />
      </section>
      <Suspense fallback={<Catalog.Root crafts={crafts} selected={[]} />}>
        <Catalog.Search crafts={crafts} />
      </Suspense>
      <JsonLd data={getStructuredData(list)} />
    </div>
  );
};

export default Page;

/* ///////////////////////////////////////////////// */

const TITLE = 'Crafts';
const DESCRIPTION =
  'Small interface experiments on motion, interaction, layout and reading, built to learn how interfaces should feel.';

const getStructuredData = (crafts: CraftItem[]): WithContext<CollectionPage> => {
  const url = new URL('/crafts', env.APP_URL).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: 'en-US',
    isPartOf: { '@id': structuredDataIds.website },
    author: { '@id': structuredDataIds.person },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: crafts.length,
      itemListElement: crafts.map((craft, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(`/crafts/${craft.slug}`, env.APP_URL).toString(),
        name: craft.title,
      })),
    },
  };
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/crafts',
  },
  openGraph: {
    ...baseMetadata.openGraph,
    url: '/crafts',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: TITLE,
    description: DESCRIPTION,
  },
};

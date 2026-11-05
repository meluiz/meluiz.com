import type { Metadata } from 'next';
import type { Graph } from 'schema-dts';
import type { CraftItem } from '@/modules/crafts';

import { IconArrowUpRight } from '@central-icons/outlined-sharp';
import env from 'envin/env';
import { notFound } from 'next/navigation';

import { metadata as baseMetadata, manifest } from '@/constants/metadata';
import { Craft, Mdx, Playground } from '@/modules/crafts';
import {
  getCraftBySlug,
  getCraftList,
  getCraftNeighbors,
  getCraftPosition,
  getCraftSourceUrl,
} from '@/modules/crafts/services';

const Page = async (props: PageProps<'/crafts/[slug]'>) => {
  const { slug } = await props.params;

  const craft = getCraftBySlug(slug);

  if (craft == null) {
    return notFound();
  }

  const Body = craft.body;
  const Preview = craft.preview;

  const neighbors = getCraftNeighbors(craft);
  const { position, total } = getCraftPosition(craft);

  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft sm:border-x">
      <Craft.Topbar serial={craft.serial} position={position} total={total} />
      <Craft.Header craft={craft} />

      {Preview && (
        <Playground.Stage label={`${craft.title} ∙ Live`} hint={craft.hint}>
          <Playground.Toolbar>
            <Playground.Source
              native={false}
              render={
                <a href={getCraftSourceUrl(craft)} rel="noreferrer noopener" target="_blank" />
              }
            >
              Source
              <IconArrowUpRight />
            </Playground.Source>
          </Playground.Toolbar>
          <Preview />
        </Playground.Stage>
      )}

      <article className="flex flex-col gap-3.5 px-4 pt-9 pb-10 leading-relaxed sm:px-6">
        <Body components={Mdx.Components} />
        <Craft.Specs specs={craft.specs} />
      </article>

      {neighbors && <Craft.Pager prev={neighbors.prev} next={neighbors.next} />}

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be serialized into the document
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(craft)).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  );
};

export default Page;

/* ///////////////////////////////////////////////// */

const getCraftPath = (craft: CraftItem) => `/crafts/${craft.slug}`;

const getStructuredData = (craft: CraftItem): Graph => {
  const url = new URL(getCraftPath(craft), env.APP_URL).toString();
  const author = {
    '@type': 'Person',
    name: manifest.name,
    url: env.APP_URL.toString(),
  } as const;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': url,
        url,
        name: craft.title,
        headline: craft.title,
        description: craft.description,
        datePublished: craft.date,
        keywords: craft.tags.join(', '),
        inLanguage: 'en',
        author,
        creator: author,
        isPartOf: {
          '@type': 'CollectionPage',
          name: 'Crafts',
          url: new URL('/crafts', env.APP_URL).toString(),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: env.APP_URL.toString() },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Crafts',
            item: new URL('/crafts', env.APP_URL).toString(),
          },
          { '@type': 'ListItem', position: 3, name: craft.title, item: url },
        ],
      },
    ],
  };
};

export const generateStaticParams = () => {
  return getCraftList().map((craft) => ({ slug: craft.slug }));
};

export const generateMetadata = async (
  props: PageProps<'/crafts/[slug]'>,
): Promise<Metadata> => {
  const { slug } = await props.params;

  const craft = getCraftBySlug(slug);

  if (craft == null) {
    return {};
  }

  const path = getCraftPath(craft);

  return {
    title: craft.title,
    description: craft.description,
    keywords: craft.tags,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      url: path,
      title: craft.title,
      description: craft.description,
      publishedTime: craft.date,
      authors: [env.APP_URL.toString()],
      tags: craft.tags,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: craft.title,
      description: craft.description,
    },
  };
};

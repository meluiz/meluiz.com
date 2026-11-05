import type { Metadata } from 'next';

import { metadata as baseMetadata } from '@/constants/metadata';
import { Craft, Masthead, Stats } from '@/modules/crafts';
import { getCraftStats, getCraftsByTags, parseCraftTags } from '@/modules/crafts/services';

const Page = async (props: PageProps<'/crafts'>) => {
  const { tags } = await props.searchParams;

  const selected = parseCraftTags(tags);
  const filtered = getCraftsByTags(selected);
  const stats = getCraftStats();

  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft sm:border-x">
      <section aria-labelledby="masthead-title" className="relative divide-y divide-stroke">
        <Masthead total={stats.total} />
        <Stats total={stats.total} since={stats.since} latest={stats.latest} />
      </section>
      <Craft.Filter tags={selected} count={filtered.length} total={stats.total} />
      <Craft.Results crafts={filtered} selected={selected} />
    </div>
  );
};

export default Page;

/* ///////////////////////////////////////////////// */

const TITLE = 'Crafts';
const DESCRIPTION =
  'Small interface experiments on motion, interaction, layout and reading, built to learn how interfaces should feel.';

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

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

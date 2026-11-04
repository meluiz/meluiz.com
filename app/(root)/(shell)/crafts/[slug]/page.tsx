import { Craft } from '@/modules/crafts';

const Page = async () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft md:border-x">
      <Craft.Topbar />
      <Craft.Header />
      <article className="flex flex-col gap-3.5 px-4 pt-9 pb-10 leading-relaxed sm:px-6">
        <Craft.Specs />
      </article>
      <Craft.Pager />
    </div>
  );
};

export default Page;

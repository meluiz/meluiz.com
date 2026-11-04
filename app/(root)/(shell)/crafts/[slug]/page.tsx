import { IconArrowUpRight } from '@central-icons/outlined-sharp';
import { notFound } from 'next/navigation';

import { Craft, Mdx, Playground } from '@/modules/crafts';
import {
  getCraftBySlug,
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
            <Playground.Reset>Reset</Playground.Reset>
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
    </div>
  );
};

export default Page;

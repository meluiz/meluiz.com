import { IconArrowUpRight } from '@central-icons/outlined-sharp';

import { Craft, Playground } from '@/modules/crafts';

const Page = async () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft sm:border-x">
      <Craft.Topbar />
      <Craft.Header />
      <Playground.Stage label="Dock ∙ Live" hint="Open [settings], then try every readout">
        <Playground.Toolbar>
          <Playground.Reset>Reset</Playground.Reset>
          <Playground.Source>
            Source
            <IconArrowUpRight />
          </Playground.Source>
        </Playground.Toolbar>
        <Playground.Status>Closed · system · 60%</Playground.Status>
      </Playground.Stage>
      <article className="flex flex-col gap-3.5 px-4 pt-9 pb-10 leading-relaxed sm:px-6">
        <Playground.Inline label="Demo" caption="oi">
          oi
          <Playground.Action>Play</Playground.Action>
        </Playground.Inline>
        <Craft.Specs />
      </article>
      <Craft.Pager />
    </div>
  );
};

export default Page;

import { Page } from '@/components/layout';
import { About } from '@/modules/home';
import { about, avatar } from '@/utils/constants';

const HomePage = () => {
  return (
    <Page.Root>
      <Page.Section aria-labelledby="page-title">
        <div className="flex flex-col gap-y-6">
          <About.Header avatar={avatar} name="Luiz Felipe" role="Front-end Developer" />
          <div className="relative block space-y-6">
            {about.map((block) => (
              <About.Section
                key={block.title}
                title={block.title}
                paragraphs={block.paragraphs}
              />
            ))}
          </div>
        </div>
      </Page.Section>
      <Page.Separator />
    </Page.Root>
  );
};

export default HomePage;

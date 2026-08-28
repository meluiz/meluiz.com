import { Page } from '@/components/layout';
import { About } from '@/modules/home';
import { about, avatar } from '@/utils/constants';

const HomePage = () => {
  return (
    <Page.Root>
      <Page.Section className="gap-y-6" aria-labelledby="page-title">
        <About.Header avatar={avatar} name="Luiz Felipe" role="Front-end Developer" />
        <div className="relative space-y-6">
          {about.map((block) => (
            <About.Section
              key={block.title}
              title={block.title}
              paragraphs={block.paragraphs}
            />
          ))}
        </div>
      </Page.Section>
    </Page.Root>
  );
};

export default HomePage;

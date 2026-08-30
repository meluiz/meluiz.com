import { About } from '@/modules/home';
import { about, avatar } from '@/utils/constants';

const HomePage = () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft md:border-x">
      <About.Root>
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
      </About.Root>
    </div>
  );
};

export default HomePage;

import { About, Colophon, colophons, Projects } from '@/modules/home';
import { about, avatar, github, projects } from '@/utils/constants';

const HomePage = () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-stroke-soft *:last:border-b md:border-x">
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
      <Projects.Root>
        <Projects.Header
          title="Things I've built"
          description="Small open-source tools where i explore reusable APIs and developer experience"
        />
        <Projects.Content githubUrl={github.url} items={projects} />
      </Projects.Root>
      <Colophon.Root>
        <Colophon.Header title="meluiz.com" tagline="Relishing the art of building things" />
        <Colophon.List items={colophons.fields} columns="narrow" />
        <Colophon.List items={colophons.stacks} columns="wide" />
        <Colophon.Inspiration items={colophons.inspiration} />
      </Colophon.Root>
    </div>
  );
};

export default HomePage;

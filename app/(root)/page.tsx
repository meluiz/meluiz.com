import { Page } from '@/components/layout';
import { About } from '@/modules/home';
import { about, avatar } from '@/utils/constants';

type PinnedProject = {
  name: string;
  description: string;
  href: string;
  language: string;
};

const projects: PinnedProject[] = [
  {
    name: 'Memojs',
    description: 'A simple and fast internal memory cache for node.js.',
    href: 'https://github.com/meluiz/memojs',
    language: 'TS',
  },
  {
    name: 'Melper',
    description: 'Explore a versatile assortment of helper utility functions.',
    href: 'https://github.com/meluiz/melper',
    language: 'TS',
  },
  {
    name: 'Tailugin',
    description: 'A collection of Tailwind CSS v4-ready utilities.',
    href: 'https://github.com/meluiz/tailugin',
    language: 'CSS',
  },
  {
    name: 'Typomoon',
    description:
      'A comprehensive TypeScript utility type library with essential type helpers for modern development.',
    href: 'https://github.com/meluiz/typomoon',
    language: 'TS',
  },
];

const cornerBase = 'pointer-events-none absolute size-3.5 border-stroke';

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
    </Page.Root>
  );
};

export default HomePage;

import type { Metadata } from 'next';
import type { ProfilePage, WithContext } from 'schema-dts';

import env from 'envin/env';

import { JsonLd } from '@/components/layout';
import { manifest, structuredDataIds } from '@/constants/metadata';
import { Experience } from '@/modules/career';
import { Colophon } from '@/modules/colophon';
import { About, Contact, Masthead } from '@/modules/profile';
import { Projects } from '@/modules/projects';

const Page = () => {
  return (
    <div className="container block flex-1 divide-y divide-stroke-soft border-stroke-soft *:last:border-b *:last:border-stroke-soft sm:border-x">
      <section aria-labelledby="masthead-title" className="relative">
        <Masthead />
        <About />
      </section>
      <Experience />
      <Projects />
      <Contact />
      <Colophon />
      <JsonLd data={structuredData} />
    </div>
  );
};

export default Page;

/* ///////////////////////////////////////////////// */

// Google reads ProfilePage as "this page is about this person", eligible for profile results
const structuredData: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': new URL('/#profile', env.APP_URL).toString(),
  url: env.APP_URL.toString(),
  name: manifest.name,
  description: manifest.description,
  inLanguage: 'en-US',
  isPartOf: { '@id': structuredDataIds.website },
  mainEntity: { '@id': structuredDataIds.person },
};

/* ///////////////////////////////////////////////// */

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

import type { Metadata, MetadataRoute, Viewport } from 'next';
import type { Graph, Person, WebSite } from 'schema-dts';

import env from 'envin/env';

import { freeze } from '@/utils/helpers';

export const manifest = freeze<MetadataRoute.Manifest>({
  name: 'Luiz Felipe',
  short_name: 'meluiz',
  start_url: '/',
  description: 'Relishing the details. Fostering innovation. Achieving excellence.',
  display: 'standalone',
  theme_color: '#1C1917',
  background_color: '#E7E5E4',
  icons: [
    {
      src: '/icon/16',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      src: '/icon/32',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: '/icon/48',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      src: '/icon/96',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: '/icon/144',
      sizes: '144x144',
      type: 'image/png',
    },
    {
      src: '/icon/192',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icon/512',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
});

export const metadata = freeze<Metadata>({
  // The home page carries the full name; inner pages read "Crafts | meluiz"
  title: {
    default: manifest.name ?? 'Luiz Felipe',
    template: `%s | ${manifest.short_name ?? 'meluiz'}`,
  },
  appleWebApp: true,
  description: manifest.description,
  applicationName: manifest.short_name,
  category: 'personal',
  generator: 'Next.js',
  metadataBase: env.APP_URL,
  manifest: '/manifest.webmanifest',
  authors: [
    {
      name: 'meluiz',
      url: 'https://meluiz.com',
    },
  ],
  keywords: [
    'meluiz',
    'luiz felipe',
    'front-end developer',
    'frontend engineer',
    'react developer',
    'next.js developer',
    'react native developer',
    'typescript',
    'web development',
    'mobile development',
    'ui development',
    'web performance',
    'responsive design',
    'digital accessibility',
    'developer portfolio',
    'freelance developer Brazil',
  ],
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: env.APP_URL.toString(),
    title: manifest.name,
    siteName: manifest.short_name,
    description: manifest.description,
    images: {
      url: new URL('/opengraph-image.png', env.APP_URL),
      secureUrl: new URL('/opengraph-image.png', env.APP_URL),
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: manifest.short_name,
    },
    videos: {
      url: new URL('/opengraph-video.mp4', env.APP_URL),
      secureUrl: new URL('/opengraph-video.mp4', env.APP_URL),
      width: 1200,
      height: 630,
      type: 'video/mp4',
    },
  },
  twitter: {
    title: manifest.name,
    description: manifest.description,
    site: '@omeluiz',
    creator: '@omeluiz',
    card: 'summary_large_image',
    images: new URL('/twitter-image.png', env.APP_URL),
  },
});

// Zoom stays enabled: blocking it fails WCAG 1.4.4 (Resize Text)
export const viewport = freeze<Viewport>({
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7e5e4' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
});

export const robots = freeze<MetadataRoute.Robots>({
  host: env.APP_URL.toString(),
  sitemap: new URL('/sitemap.xml', env.APP_URL).toString(),
  rules: {
    allow: '/',
    userAgent: '*',
  },
});

export const sitemap = freeze<MetadataRoute.Sitemap>([
  {
    priority: 1,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    url: env.APP_URL.toString(),
  },
]);

/* ------- structured data ------- */

// Stable node ids, so pages reference the same entities instead of repeating them
export const structuredDataIds = freeze({
  person: new URL('/#person', env.APP_URL).toString(),
  website: new URL('/#website', env.APP_URL).toString(),
});

export const person = freeze<Person>({
  '@type': 'Person',
  '@id': structuredDataIds.person,
  name: manifest.name,
  description: manifest.description,
  url: env.APP_URL.toString(),
  alternateName: manifest.short_name,
  image: 'https://avatars.githubusercontent.com/u/52682525',
  jobTitle: 'Front-end Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Grupo Plan Marketing',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Minas Gerais',
    addressCountry: 'BR',
  },
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'React Native',
    'Tailwind CSS',
    'Node',
    'Bunjs',
  ],
  sameAs: [
    'https://x.com/omeluiz',
    'https://github.com/meluiz',
    'https://linkedin.com/in/meluiz',
  ],
});

export const website = freeze<WebSite>({
  '@type': 'WebSite',
  '@id': structuredDataIds.website,
  url: env.APP_URL.toString(),
  name: manifest.short_name,
  alternateName: manifest.name,
  description: manifest.description,
  inLanguage: 'en-US',
  publisher: { '@id': structuredDataIds.person },
});

// Rendered on every page by the root layout; pages add their own nodes that point here
export const siteGraph = freeze<Graph>({
  '@context': 'https://schema.org',
  '@graph': [website, person],
});

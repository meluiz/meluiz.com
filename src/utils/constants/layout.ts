import type { Metadata, MetadataRoute, Viewport } from 'next';
import type { Person, WithContext } from 'schema-dts';

import { env } from 'envin/env';

export const manifest = Object.freeze<MetadataRoute.Manifest>({
  name: 'Luiz Felipe',
  short_name: 'meluiz',
  start_url: '/',
  description: 'Relishing the details. Fostering innovation. Achieving excellence.',
  display: 'standalone',
  theme_color: '#1C1917',
  background_color: '#E7E5E4',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
  ],
});

export const metadata = Object.freeze<Metadata>({
  title: {
    default: manifest.short_name ?? 'meluiz',
    template: `%s | ${manifest.short_name ?? 'meluiz'}`,
  },
  appleWebApp: true,
  description: manifest.description,
  applicationName: manifest.short_name,
  category: 'personal',
  generator: 'Next.js',
  metadataBase: env.APP_URL,
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
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
    title: manifest.short_name,
    siteName: manifest.short_name,
    description: manifest.description,
  },
  twitter: {
    title: manifest.short_name,
    description: manifest.description,
    site: '@omeluiz',
    creator: '@omeluiz',
    card: 'summary_large_image',
  },
});

export const viewport = Object.freeze<Viewport>({
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7e5e4' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
});

export const robots = Object.freeze<MetadataRoute.Robots>({
  host: env.APP_URL.toString(),
  sitemap: new URL('/sitemap.xml', env.APP_URL).toString(),
  rules: {
    allow: '/',
    userAgent: '*',
  },
});

export const sitemap = Object.freeze<MetadataRoute.Sitemap>([
  {
    priority: 1,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    url: env.APP_URL.toString(),
  },
]);

export const ldJSON = Object.freeze<WithContext<Person>>({
  '@context': 'https://schema.org',
  '@type': 'Person',
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
  knowsAbout: ['TypeScript', 'React', 'Next.js', 'React Native', 'Tailwind CSS'],
  sameAs: [
    'https://x.com/omeluiz',
    'https://github.com/meluiz',
    'https://linkedin.com/in/meluiz',
  ],
});

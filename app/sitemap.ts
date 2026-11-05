import type { MetadataRoute } from 'next';

import env from 'envin/env';

import { sitemap } from '@/constants/metadata';
import { getCraftList, getCraftStats } from '@/modules/crafts/services';

export default (): MetadataRoute.Sitemap => {
  const crafts = getCraftList();
  const { latest } = getCraftStats();

  return [
    ...sitemap,
    {
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: latest ? new Date(latest) : new Date(),
      url: new URL('/crafts', env.APP_URL).toString(),
    },
    ...crafts.map((craft) => ({
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(craft.date),
      url: new URL(`/crafts/${craft.slug}`, env.APP_URL).toString(),
    })),
  ];
};

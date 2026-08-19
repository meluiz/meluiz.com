import type { NextConfig } from 'next';

import './env.config';

export default {
  reactCompiler: true,
  crossOrigin: 'anonymous',
  transpilePackages: ['envin'],
  experimental: {
    staleTimes: {
      static: 60,
      dynamic: 60,
    },
  },
  headers: async () => {
    return [
      {
        source:
          '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|[^?]*\\.(?:css|js(?!on)|jpe?g|webp|png|gif|svg|ico|woff2?)).*)',
        headers: [
          {
            key: 'Critical-CH',
            value: 'Sec-CH-Prefers-Color-Scheme',
          },
          {
            key: 'Vary',
            value: 'Sec-CH-Prefers-Color-Scheme, Cookie',
          },
          {
            key: 'Accept-CH',
            value:
              'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Viewport-Width, Width, DPR',
          },
        ],
      },
    ];
  },
} satisfies NextConfig;

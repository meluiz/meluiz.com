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
        source: '/(.*)',
        headers: [
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

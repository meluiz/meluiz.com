import type { NextConfig } from 'next';

import './env.config';

export default {
  typedRoutes: true,
  reactCompiler: true,
  crossOrigin: 'anonymous',
  transpilePackages: ['envin'],
  experimental: {
    staleTimes: {
      static: 60,
      dynamic: 60,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/*.png',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
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

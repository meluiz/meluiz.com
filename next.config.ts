import type { NextConfig } from 'next';

export default {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: false,
  crossOrigin: 'anonymous',
  transpilePackages: ['envin'],
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  experimental: {
    globalNotFound: true,
    staleTimes: {
      static: 60,
      dynamic: 60,
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/image/loader.ts',
    qualities: [75, 80],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  headers: () => {
    return [
      {
        source:
          '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|[^?]*\\.(?:css|js(?!on)|jpe?g|webp|png|gif|svg|ico|woff2?)).*)',
        headers: [
          { key: 'Accept-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
          { key: 'Critical-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
          { key: 'Vary', value: 'Sec-CH-Prefers-Color-Scheme' },
        ],
      },
    ];
  },
} satisfies NextConfig;

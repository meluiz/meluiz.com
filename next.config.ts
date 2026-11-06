import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

export default withMDX({
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
});

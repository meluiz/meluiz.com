import { defineEnv } from 'envin';
import { vercel } from 'envin/presets/zod';
import z from 'zod';

export const env = defineEnv({
  extends: [vercel],
  clientPrefix: 'NEXT_PUBLIC_',
  server: {
    APP_URL: z.httpUrl(),
    VISITORS_TOKEN: z.string(),
    CLOUDFLARE_TOKEN: z.string(),
    BUILD_TIMESTAMP: z.iso.datetime().default(new Date().toISOString()),
  },
  env: {
    APP_URL: process.env.APP_URL,
    VISITORS_TOKEN: process.env.VISITORS_TOKEN,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
    BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
  },
});

export default env;

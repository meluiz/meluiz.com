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
  },
  env: {
    APP_URL: process.env.APP_URL,
    VISITORS_TOKEN: process.env.VISITORS_TOKEN,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
  },
});

export default env;

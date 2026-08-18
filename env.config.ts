import { defineEnv } from 'envin';
import { vercel } from 'envin/presets/zod';
import { z } from 'zod/mini';

import { log } from '@/utils/helpers';

export const env = defineEnv({
  env: process.env,
  clientPrefix: 'NEXT_PUBLIC_',
  extends: [vercel],
  shared: {
    NODE_ENV: z._default(z.enum(['development', 'production', 'test']), 'development'),
  },
  server: {
    APP_URL: z.pipe(
      z.url(),
      z.transform((value) => new URL(value)),
    ),
  },
  onError: (issues) => {
    const details = issues
      .map((issue) => {
        const path = issue.path?.join('.') ?? '(root)';
        return `   ${path}: ${issue.message}`;
      })
      .join('\n');

    log.error(`Invalid environment variables:\n${details}\n`);
    process.exit(1);
  },
  onInvalidAccess: (variable) => {
    const message = [
      `⨯ Attempted to access server-side env "${variable}" on the client.`,
      'Move it to the "client" block with a NEXT_PUBLIC_ prefix, or only read it in server code.',
    ].join('\n');

    throw new Error(message);
  },
});

export default env;

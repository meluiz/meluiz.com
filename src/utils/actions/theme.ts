import { cookies, headers } from 'next/headers';
import z from 'zod';

export type Theme = z.infer<typeof ThemeScheme>;
export type ResolvedTheme = z.infer<typeof ResolvedScheme>;

export type ThemeState = {
  value: Theme;
  system: ResolvedTheme;
  options: readonly Theme[];
  resolved: ResolvedTheme;
};

/* ///////////////////////////////////////////////// */

export const ThemeEnum = z.enum(['system', 'light', 'dark']);
export const ResolvedEnum = z.enum(['dark', 'light']);

export const ThemeScheme = ThemeEnum.catch('system');
export const ResolvedScheme = ResolvedEnum.catch('light');

/* ///////////////////////////////////////////////// */

export const THEME_COOKIE = 'ch-prefers-color-scheme';

const CLIENT_HINT = 'sec-ch-prefers-color-scheme';

/* ///////////////////////////////////////////////// */

const read = async () => {
  const [cookie, header] = await Promise.all([cookies(), headers()]);

  return {
    clientHint: header.get(CLIENT_HINT) ?? undefined,
    clientTheme: cookie.get(THEME_COOKIE)?.value,
  };
};

const resolve = (cookie?: string, clientHint?: string) => {
  const value = ThemeScheme.parse(cookie);
  const system = ResolvedScheme.parse(clientHint);

  return {
    value,
    system,
    options: ThemeEnum.options,
    resolved: value === 'system' ? system : value,
  } satisfies ThemeState;
};

const state = async (): Promise<ThemeState> => {
  const { clientTheme, clientHint } = await read();
  return resolve(clientTheme, clientHint);
};

export const theme = Object.assign(read, {
  read,
  state,
  resolve,
});

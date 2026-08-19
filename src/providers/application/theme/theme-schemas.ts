import { z } from 'zod';

export type Theme = z.infer<typeof ThemeScheme>;
export type ResolvedTheme = z.infer<typeof ResolvedScheme>;

export const ThemeEnum = z.enum(['system', 'light', 'dark']);
export const ResolvedEnum = z.enum(['dark', 'light']);

export const ThemeScheme = ThemeEnum.catch('system');
export const ResolvedScheme = ResolvedEnum.catch('light');

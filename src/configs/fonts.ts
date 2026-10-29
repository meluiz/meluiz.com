import { Geist, Geist_Mono } from 'next/font/google';

export const geist = Geist({
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: [
    'ui-sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Segoe UI',
    'Inter',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
  ],
});

export const geistMono = Geist_Mono({
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'SF Mono',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
});

import type { ReactNode } from 'react';

import { Script as ColorSchemeScript } from '@/components/providers/color-scheme/color-scheme.script';
import { Script as SoundEffectsScript } from '@/components/providers/sound-effects/sound-effects.script';
import { GeistMono, GeistSans, GeistSerif } from '@/configs/fonts';

import '@/assets/styles/globals.css';

export interface DocumentProps {
  children: ReactNode;
  trailing?: ReactNode;
}

export const Document = (props: DocumentProps) => {
  const { children, trailing } = props;

  // No theme class here: the inline script sets it before paint, and the color scheme provider
  // sets it again if React ever re-creates <html> (e.g. recovering from a hydration mismatch)
  return (
    <html
      lang="en-US"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSerif.variable} overscroll-y-none pointer-coarse:scrollbar-none pointer-coarse:overscroll-y-auto`}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript />
        <SoundEffectsScript />
      </head>
      <body className="relative block min-h-min w-full font-sans text-base font-normal antialiased">
        <div
          id="__APP_ROOT"
          className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
        >
          {children}
        </div>
        {trailing}
      </body>
    </html>
  );
};

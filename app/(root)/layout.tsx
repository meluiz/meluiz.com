import { ColorScheme, SoundEffects } from '@/components/providers';
import { GeistMono, GeistSans } from '@/configs/fonts';
import { ldJSON } from '@/constants/metadata';
import { Analytics } from '@/modules/analytics';

import '@/assets/styles/globals.css';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <html
      lang="en-US"
      className={`${GeistSans.variable} ${GeistMono.variable} light overscroll-y-none pointer-coarse:scrollbar-none pointer-coarse:overscroll-y-auto`}
      suppressHydrationWarning
    >
      <head>
        <ColorScheme.Script />
        <SoundEffects.Script />
      </head>
      <body className="relative block min-h-min w-full font-sans text-base font-normal antialiased">
        <ColorScheme.Provider>
          <SoundEffects.Provider>
            <div
              id="__APP_ROOT"
              className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
            >
              {children}
            </div>
          </SoundEffects.Provider>
        </ColorScheme.Provider>
        <Analytics />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be serialized into the document
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
};

export default Layout;

export { metadata, viewport } from '@/constants/metadata';

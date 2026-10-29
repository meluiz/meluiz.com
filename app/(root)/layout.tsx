import { ColorScheme } from '@/components/providers';
import { geist, geistMono } from '@/configs/fonts';
import { ldJSON } from '@/constants/metadata';

import '@/assets/styles/globals.css';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <html
      lang="en-US"
      className={`${geist.variable} ${geistMono.variable} light overscroll-y-none pointer-coarse:scrollbar-none pointer-coarse:overscroll-y-auto`}
      suppressHydrationWarning
    >
      <head>
        <ColorScheme.Script />
      </head>
      <body className="relative block min-h-min w-full font-sans text-base font-normal antialiased">
        <ColorScheme.Provider>
          <div
            id="__APP_ROOT"
            className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
          >
            {children}
          </div>
        </ColorScheme.Provider>

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

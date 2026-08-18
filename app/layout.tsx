import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { geist, geistMono } from '@/configs/fonts';
import { ldJSON } from '@/utils/constants';

import './globals.css';

const Layout = (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <html
      lang="en-US"
      className={`${geist.variable} ${geistMono.variable} dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="relative block min-h-min w-full font-normal font-sans text-lg antialiased sm:text-base">
        <div
          id="__APP_ROOT"
          className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
        >
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: It's necessary to set the inner HTML dynamically
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
};

export default Layout;

export { metadata, viewport } from '@/utils/constants';

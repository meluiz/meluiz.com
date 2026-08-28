import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { geist, geistMono } from '@/configs/fonts';
import { SoundProvider, ThemeProvider } from '@/providers/application';
import { sound, theme } from '@/utils/actions';
import { ldJSON } from '@/utils/constants';

import '@/assets/styles/globals.css';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  const audio = await sound.state();
  const colorScheme = await theme.state();

  return (
    <html
      lang="en-US"
      className={`${geist.variable} ${geistMono.variable} ${colorScheme.resolved}`}
      style={{ colorScheme: `${colorScheme.resolved}` }}
    >
      <body className="relative block min-h-min w-full font-normal font-sans text-lg antialiased sm:text-base">
        <ThemeProvider value={colorScheme}>
          <SoundProvider value={audio}>
            <div
              id="__APP_ROOT"
              className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
            >
              {children}
            </div>
          </SoundProvider>
        </ThemeProvider>
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

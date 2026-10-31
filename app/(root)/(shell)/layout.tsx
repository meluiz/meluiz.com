import Link from 'next/link';
import { Suspense } from 'react';

import { Preferences, SkipContent } from '@/components/layout';
import { Mascot, ScrollArea } from '@/components/ui';
import { Visitors } from '@/modules/analytics';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <ScrollArea.Root className="h-dvh w-full">
      <ScrollArea.Viewport className="isolate">
        <ScrollArea.Content>
          <SkipContent target="#__APP_MAIN" />
          <header
            id="__APP_HEADER"
            className="sticky inset-0 top-0 z-10 w-full border-b border-stroke-soft bg-surface text-foreground"
          >
            <div className="relative container border-stroke-soft px-4 sm:px-4 md:border-x">
              <div className="flex min-h-18 center-between gap-x-6">
                <div className="flex flex-1 center-start space-x-3 divide-x divide-stroke">
                  <Link href="/" aria-label="meluiz, home" className="-ml-3 px-3">
                    <Mascot size={32} blink follow />
                  </Link>
                  <Suspense fallback={<Visitors.Loading />}>
                    <Visitors.Content />
                  </Suspense>
                </div>
                <div className="flex shrink-0 stretch-center gap-x-0.5 max-sm:flex-col sm:center-end max-sm:*:[button]:flex-row-reverse max-sm:*:[button]:center-start">
                  <Preferences.ThemeToggler />
                  <Preferences.SoundToggler />
                </div>
              </div>
            </div>
          </header>
          <main
            id="__APP_MAIN"
            tabIndex={-1}
            className="relative flex w-full flex-1 bg-surface text-foreground outline-hidden"
          >
            {children}
          </main>
          <footer
            id="__APP_FOOTER"
            className="relative container border-stroke-soft px-4 pt-8 pb-24 sm:px-6 sm:pt-10 md:border-x"
          >
            <p className="text-center font-mono text-xs font-medium text-foreground-soft uppercase">
              meluiz @ {new Date().getFullYear()}
            </p>
          </footer>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default Layout;

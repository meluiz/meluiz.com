import { Suspense } from 'react';

import { Controls, Visitors } from '@/modules/root';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <div className="relative flex min-h-fit w-full flex-1 flex-col">
      <a
        href="#__APP_MAIN"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-md focus-visible:border focus-visible:border-stroke-soft focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:font-semibold focus-visible:text-foreground focus-visible:text-xs focus-visible:uppercase"
      >
        Skip to content
      </a>
      <header
        id="__APP_HEADER"
        className="sticky inset-0 top-0 z-10 w-full border-stroke-soft border-b bg-surface text-foreground"
      >
        <div className="container relative border-stroke-soft px-4 sm:px-6 md:border-x">
          <div className="center-between flex min-h-18 gap-x-6">
            <Suspense fallback={<Visitors.Loading />}>
              <Visitors.Stats />
            </Suspense>
            <Controls />
          </div>
        </div>
      </header>
      <main
        tabIndex={-1}
        id="__APP_MAIN"
        className="relative flex w-full flex-1 bg-surface text-foreground"
      >
        {children}
      </main>
      <footer
        id="__APP_FOOTER"
        className="container relative border-stroke-soft px-4 pt-2 pb-18.5 sm:px-6 sm:pt-4 md:border-x"
      >
        <p className="text-center font-medium font-mono text-foreground-soft text-xs uppercase">
          meluiz @ {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Layout;

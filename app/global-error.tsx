'use client';

import Cookies from 'js-cookie';
import React from 'react';

import { Button } from '@/components/ui';
import { geist, geistMono } from '@/configs/fonts';
import { THEME_COOKIE, THEME_MEDIA_QUERY } from '@/providers/application';
import { log } from '@/utils/helpers';

import '@/assets/styles/globals.css';

type GlobalErrorBoundaryProps = {
  retry: () => void;
  error: Error & { digest?: string };
};

const GlobalErrorBoundary = (props: GlobalErrorBoundaryProps) => {
  const { error, retry } = props;

  const [colorScheme] = React.useState(() => {
    const media = window.matchMedia(THEME_MEDIA_QUERY);
    const value = Cookies.get(THEME_COOKIE);

    return value ?? (media.matches ? 'dark' : 'light');
  });

  React.useEffect(() => {
    log.error(error);
  }, [error]);

  return (
    <html
      lang="en-US"
      className={`${geist.variable} ${geistMono.variable} ${colorScheme}`}
      style={{ colorScheme: `${colorScheme}` }}
    >
      <body className="relative block min-h-min w-full font-normal font-sans text-lg antialiased sm:text-base">
        <div
          id="__APP_ROOT"
          className="relative isolate flex min-h-dvh w-full flex-col bg-surface text-foreground"
        >
          <div className="center relative flex flex-1">
            <div className="flex max-w-md flex-col items-start gap-y-4 px-4 sm:px-6">
              <h1 className="bg-surface-inverse px-2 py-1 text-left font-bold font-mono text-4xl text-foreground-inverse sm:text-5xl">
                500
              </h1>
              <div className="flex flex-col items-start gap-y-1">
                <p className="text-left font-medium font-mono text-foreground text-lg">
                  Something went wrong.
                </p>
                <p className="text-left font-mono text-foreground-soft text-sm">
                  An unexpected error occurred while loading this page.
                </p>
              </div>
              <Button.Root variant="link" className="px-0" onClick={retry}>
                <Button.Label>Try again</Button.Label>
              </Button.Root>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalErrorBoundary;

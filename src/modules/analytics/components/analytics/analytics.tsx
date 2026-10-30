'use client';

import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';

/* ///////////////////////////////////////////////// */

const ENDPOINT = 'https://visitors.meluiz.com/hit';

/* ///////////////////////////////////////////////// */

const shouldSkip = () => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  try {
    if (localStorage.getItem('visitors:ignore') === '1') {
      return true;
    }
  } catch {}

  return navigator.webdriver === true;
};

const pageview = async (pathname: string) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || null,
      }),
    });

    if (!response.ok) {
      console.error(`[analytics] pageview failed: ${response.status}`);
    }
  } catch (error) {
    // Network failure, blocked by an ad blocker, etc.
    console.error('[analytics] pageview error', error);
  }
};
/* ///////////////////////////////////////////////// */

const AnalyticsComponent = () => {
  const pathname = usePathname();
  const lastTracked = React.useRef<string | null>(null);

  React.useEffect(() => {
    // Prevents double tracking in Strict Mode and on re-renders
    if (lastTracked.current === pathname) {
      return;
    }

    lastTracked.current = pathname;

    if (shouldSkip()) {
      return;
    }

    void pageview(pathname);
  }, [pathname]);

  return null;
};

export const Analytics = () => {
  return (
    <Suspense fallback={null}>
      <AnalyticsComponent />
    </Suspense>
  );
};

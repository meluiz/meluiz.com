'use client';

import React from 'react';

import { toRelativeDate } from '../../visitors.utils';

/* ///////////////////////////////////////////////// */

const TICK_INTERVAL = 60_000;

/* ///////////////////////////////////////////////// */

export interface RelativeDateProps {
  iso: string;
  /** Text rendered on the server, kept until the first tick so hydration changes nothing. */
  fallback: string;
}

// The page HTML is cached, so the server text can be a little old and in UTC. Recomputing it
// on hydration made the header flicker; instead the server text stays put and the browser
// takes over on the next tick, where a changing "x minutes ago" reads as the clock moving
export const RelativeDate = (props: RelativeDateProps) => {
  const { iso, fallback } = props;

  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, TICK_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  if (now === null) {
    return fallback;
  }

  return toRelativeDate(iso, now) ?? fallback;
};

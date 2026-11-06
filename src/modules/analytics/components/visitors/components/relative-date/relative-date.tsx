'use client';

import { useHydrated } from '@/hooks/lifecycle';

import { toRelativeDate } from '../../visitors.utils';

/* ///////////////////////////////////////////////// */

export interface RelativeDateProps {
  iso: string;
  /** Text rendered on the server, kept until hydration so the markup matches. */
  fallback: string;
}

// The page HTML is cached, so the server text can be a few seconds old and in UTC. Once
// hydrated, the date is formatted again against the visitor's clock and timezone
export const RelativeDate = (props: RelativeDateProps) => {
  const { iso, fallback } = props;

  const hydrated = useHydrated();

  return <>{hydrated ? (toRelativeDate(iso) ?? fallback) : fallback}</>;
};

import { countries } from '@/constants/countries';

import { getVisitorsStats, getVisitorsVisit } from './visitors';

/* ///////////////////////////////////////////////// */

export interface VisitorsSummary {
  total: number | null;
  // `null` when the latest visit couldn't be fetched
  latest: {
    // `null` when no visit was recorded yet
    date: string | null;
    country: string | null;
  } | null;
}

/* ///////////////////////////////////////////////// */

const toCountryCode = (code: string | null | undefined) => {
  if (!code) {
    return null;
  }

  const country = countries.find((item) => item.short_code === code.toLowerCase());

  return country?.long_code ?? null;
};

/* ///////////////////////////////////////////////// */

// Returns `null` when both requests fail, so the header can hide the counter
export const getVisitorsSummary = async (): Promise<VisitorsSummary | null> => {
  const [stats, visit] = await Promise.all([
    getVisitorsStats(),
    getVisitorsVisit({ limit: 1 }),
  ]);

  if (!stats && !visit) {
    return null;
  }

  const latest = visit?.visits.at(0);

  return {
    total: stats?.total ?? null,
    latest: visit
      ? {
          date: latest?.visited_at ?? null,
          country: toCountryCode(latest?.country),
        }
      : null,
  };
};

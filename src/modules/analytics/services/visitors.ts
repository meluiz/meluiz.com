import { DateTime } from 'luxon';
import { unstable_cache } from 'next/cache';
import { isXiorError } from 'xior';

import { visitors } from '../configs';

/* ///////////////////////////////////////////////// */

export interface Visit {
  id: number;
  domain: string;
  path: string;
  visited_at: string;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  referrer: string | null;
  user_agent: string | null;
  visitor_hash: string | null;
}

export interface VisitsResponse {
  total: number;
  limit: number;
  offset: number;
  visits: Visit[];
}

export interface PathStat {
  domain: string;
  path: string;
  visits: number;
}

export interface CountryStat {
  country: string | null;
  visits: number;
}

export interface DayStat {
  day: string;
  visits: number;
  unique_visitors: number;
}

export interface VisitorFilters {
  domain?: string;
  path?: string;
  days?: number;
}

/* ///////////////////////////////////////////////// */

const DEFAULT_DAYS = 30;
const DEFAULT_DOMAIN = 'meluiz.com';

// Keep in sync with `revalidate` in app/(root)/(shell)/layout.tsx, so the page and the data
// expire together
const REVALIDATE_SECONDS = 10;

/* ///////////////////////////////////////////////// */

const getRange = (days: number) => {
  const until = DateTime.utc().startOf('minute');
  const since = until.minus({ days });

  return {
    from: since.toISO() ?? undefined,
    to: until.toISO() ?? undefined,
  };
};

const logError = (scope: string, error: unknown) => {
  if (isXiorError(error)) {
    console.error(`[visitors] ${scope} failed`, error.response?.status, error.response?.data);
    return;
  }

  console.error(`[visitors] ${scope} error`, error);
};

/* ///////////////////////////////////////////////// */

export interface GetVisitorsVisitsParams extends VisitorFilters {
  limit?: number;
  offset?: number;
}

export const getVisitorsVisit = unstable_cache(
  async (params?: GetVisitorsVisitsParams) => {
    const { domain = DEFAULT_DOMAIN, path, days = DEFAULT_DAYS, limit, offset } = params ?? {};

    try {
      const { data } = await visitors.get<VisitsResponse>('/visits', {
        params: {
          domain,
          path,
          limit,
          offset,
          ...getRange(days),
        },
      });

      return data;
    } catch (error) {
      logError('getVisitorsVisit', error);
      return null;
    }
  },
  ['getVisitorsVisit'],
  { revalidate: REVALIDATE_SECONDS },
);

export type GetStatsParams = VisitorFilters;

export interface StatsResponse {
  total: number;
  unique_visitors: number;
  paths: PathStat[];
  countries: CountryStat[];
  days: DayStat[];
}

export const getVisitorsStats = unstable_cache(
  async (params?: GetStatsParams) => {
    const { domain = DEFAULT_DOMAIN, path, days = DEFAULT_DAYS } = params ?? {};

    try {
      const { data } = await visitors.get<StatsResponse>('/stats', {
        params: {
          domain,
          path,
          ...getRange(days),
        },
      });

      return data;
    } catch (error) {
      logError('getVisitorsStats', error);
      return null;
    }
  },
  ['getVisitorsStats'],
  { revalidate: REVALIDATE_SECONDS },
);

export interface GetCountParams {
  domain?: string;
  path?: string;
}

export const getVisitorsCount = unstable_cache(
  async (params?: GetCountParams): Promise<number | null> => {
    const { domain = DEFAULT_DOMAIN, path } = params ?? {};

    try {
      const { data } = await visitors.get<VisitsResponse>('/visits', {
        params: {
          domain,
          path,
          limit: 1,
        },
      });

      return data.total;
    } catch (error) {
      logError('getVisitorsCount', error);
      return null;
    }
  },
  ['getVisitorsCount'],
  { revalidate: REVALIDATE_SECONDS },
);

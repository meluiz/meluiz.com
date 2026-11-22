import { DateTime } from 'luxon';
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

/* ///////////////////////////////////////////////// */

// The pages are ISR (see `revalidate` in app/(root)/(shell)/layout.tsx), so any stale-while-
// revalidate cache under them makes a regeneration render the previous data. The range ends at the
// current millisecond: the latest visit is always included, and since the URL is the fetch cache
// key, a regeneration never reads a stale entry from it
const getRange = (days: number) => {
  const until = DateTime.utc();
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

export const getVisitorsVisit = async (params?: GetVisitorsVisitsParams) => {
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
};

export type GetStatsParams = VisitorFilters;

export interface StatsResponse {
  total: number;
  unique_visitors: number;
  paths: PathStat[];
  countries: CountryStat[];
  days: DayStat[];
}

export const getVisitorsStats = async (params?: GetStatsParams) => {
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
};

export interface GetCountParams {
  domain?: string;
  path?: string;
}

export const getVisitorsCount = async (params?: GetCountParams): Promise<number | null> => {
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
};

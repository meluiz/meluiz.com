import type { Dict } from '@motiro/types';

import { isAxiosError } from 'axios';
import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { vercel } from '@/configs/http';
import { log } from '@/utils/helpers';

const getTimeRange = () => {
  const until = DateTime.utc().endOf('day');
  const since = until.startOf('day').minus({ days: 1 });

  return {
    since: since.toISO(),
    until: until.toISO(),
  };
};

const buildInitialSearchParams = (data: Dict<string> = {}): URLSearchParams => {
  return new URLSearchParams({
    projectId: env.VERCEL_PROJECT_ID,
    ...data,
  });
};

/* ///////////////////////////////////////////////// */

export type VisitsCount = {
  version: number;
  data: VisitsCountData;
  query: VisitsCountQuery;
};

type VisitsCountQuery = {
  since: string;
  until: string;
};

type VisitsCountData = {
  visitors: number;
  pageviews: number;
};

export const getVisitsCount = async (): Promise<VisitsCount> => {
  const { since, until } = getTimeRange();

  const params = buildInitialSearchParams();

  try {
    const { data } = await vercel.get<VisitsCount>(`/query/web-analytics/visits/count`, {
      params,
    });

    log.info(`vercel total: count=${data.data.pageviews} visits=${data.data.visitors}`);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      log.error(`Error fetching visits count:\n   ${JSON.stringify(error.response?.data)}`);
    }

    return {
      version: 0,
      query: { since: since, until: until },
      data: { visitors: 0, pageviews: 0 },
    };
  }
};

/* ///////////////////////////////////////////////// */

export type VisitsAggregate = {
  version: number;
  data: VisitsAggregateBucket[];
  query: VisitsAggregateQuery;
};

type VisitsAggregateQuery = {
  since: string;
  until: string;
  limit?: number;
  groupBy: string[];
};

type VisitsAggregateBucket = {
  country: string;
  visitors: number;
  pageviews: number;
  timestamp: string;
};

export const getVisitsAggregated = async (): Promise<VisitsAggregate> => {
  const { since, until } = getTimeRange();

  const params = buildInitialSearchParams({
    since: since,
    until: until,
    limit: '10',
  });

  params.append('by', 'country');
  params.append('by', 'hour');

  try {
    const { data } = await vercel.get<VisitsAggregate>(
      `/query/web-analytics/visits/aggregate`,
      { params },
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      log.error(
        `Error fetching aggregated visits:\n   ${JSON.stringify(error.response?.data?.error?.message)}`,
      );
    }

    return {
      version: 0,
      data: [],
      query: {
        since: since,
        until: until,
        groupBy: ['country', 'hour'],
        limit: 10,
      },
    };
  }
};

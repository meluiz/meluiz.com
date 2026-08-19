import { isAxiosError } from 'axios';
import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { vercel } from '@/configs/http';
import { log } from '@/utils/helpers';

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

export const getVisitsCount = async () => {
  const params = new URLSearchParams({
    projectId: env.VERCEL_PROJECT_ID,
  });

  try {
    const { data } = await vercel.get<VisitsCount>(`/query/web-analytics/visits/count`, {
      params,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      log.error(`Error fetching visits count:\n   ${JSON.stringify(error.response?.data)}`);
    }

    const until = DateTime.utc();
    const since = until.minus({ days: 1 });

    return {
      version: 0,
      query: { since: since.toISO(), until: until.toISO() },
      data: { visitors: 0, pageviews: 0 },
    };
  }
};

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

export const getVisitsAggregated = async () => {
  const until = DateTime.utc();
  const since = until.minus({ days: 1 });

  const params = new URLSearchParams({
    projectId: env.VERCEL_PROJECT_ID,
    since: since.toISO(),
    until: until.toISO(),
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
        `Error fetching aggregated visits:\n   ${JSON.stringify(error.response?.data)}`,
      );
    }

    return {
      version: 1,
      data: [],
      query: {
        since: since.toISO(),
        until: until.toISO(),
        groupBy: ['country', 'hour'],
        limit: 10,
      },
    };
  }
};

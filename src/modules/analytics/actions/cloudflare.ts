import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { graphql } from '@/configs/graphql';
import { log } from '@/utils/helpers';

import { ViewerLastAccessQuery, ViewerTotalQuery } from '../queries';

type TimeRange = {
  until: string;
  since: string;
};

const getTimeRange = (days = 30) => {
  const until = DateTime.utc().startOf('minute');
  const since = until.minus({ days });

  return {
    since: since.toISO(),
    until: until.toISO(),
  };
};

type BuildResultObjectOptions = {
  version?: number;
  until: string;
  since: string;
};

const buildResultObject = <T>(data: T, options: BuildResultObjectOptions) => {
  const { version = 4, until, since } = options;

  return {
    data,
    version,
    query: {
      since,
      until,
    },
  };
};

const buildVariables = (range: TimeRange) => {
  const { until, since } = range;
  const { hostname } = env.APP_URL;

  return {
    endDate: until,
    startDate: since,
    siteTag: env.CLOUDFLARE_SITE_TAG,
    accountTag: env.CLOUDFLARE_ACCOUNT_TAG,
    hosts: [hostname, `www.${hostname}`],
  };
};

/* ///////////////////////////////////////////////// */

export type ViewerTotal = {
  version: number;
  data: ViewerTotalData;
  query: ViewerTotalQuery;
};

type ViewerTotalQuery = {
  since: string;
  until: string;
};

type ViewerTotalData = {
  visitors: number;
  pageviews: number;
};

export const getViewerTotal = async (): Promise<ViewerTotal> => {
  const timeRange = getTimeRange(30);

  try {
    const { data } = await graphql.query({
      query: ViewerTotalQuery,
      variables: buildVariables(timeRange),
    });

    const group = data?.viewer.accounts.at(0)?.total.at(0);

    if (!group) {
      throw new Error('Cloudflare returned no groups');
    }

    log.info(
      `cloudflare total: count=${group.count} visits=${group.sum.visits} interval=${group.avg.sampleInterval}`,
    );

    return buildResultObject(
      {
        pageviews: group.count,
        visitors: group.sum.visits,
      },
      timeRange,
    );
  } catch (error) {
    log.error(`Error fetching Cloudflare total:\n   ${error}`);

    return buildResultObject(
      {
        pageviews: 0,
        visitors: 0,
      },
      { ...timeRange, version: 0 },
    );
  }
};

/* ///////////////////////////////////////////////// */

export type ViewerLastAccess = {
  version: number;
  data: ViewerLastAccessData[];
  query: ViewerLastAccessQuery;
};

type ViewerLastAccessQuery = {
  since: string;
  until: string;
};

type ViewerLastAccessData = {
  country: string;
  visitors: number;
  pageviews: number;
  timestamp: string;
};

export const getViewerLastAccess = async (): Promise<ViewerLastAccess> => {
  const timeRange = getTimeRange();

  try {
    const { data } = await graphql.query({
      query: ViewerLastAccessQuery,
      variables: buildVariables(timeRange),
    });

    const account = data?.viewer.accounts[0];
    const results = account?.lastAccess.map((access) => ({
      country: access.dimensions.countryName ?? 'unknown',
      pageviews: access.count,
      visitors: access.sum.visits,
      timestamp: access.dimensions.datetimeMinute,
    }));

    if (!results) {
      throw new Error('Cloudflare returned no results');
    }

    return buildResultObject(results, timeRange);
  } catch (error) {
    log.error(`Error fetching Cloudflare last access:\n   ${error}`);

    return buildResultObject([], { ...timeRange, version: 0 });
  }
};

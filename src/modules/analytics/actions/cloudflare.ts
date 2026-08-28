import { env } from 'envin/env';
import { DateTime } from 'luxon';

import { graphql } from '@/configs/graphql';

import { ViewerLastAccessQuery, ViewerTotalQuery } from '../queries';

type TimeRange = {
  until: string;
  since: string;
};

const getTimeRange = () => {
  const until = DateTime.utc().endOf('day');
  const since = until.startOf('day').minus({ days: 30 });

  return {
    since: since.toISO(),
    until: until.toISO(),
  };
};

const buildResultObject = <T>(data: T) => {
  const { until, since } = getTimeRange();

  return {
    data,
    version: 4,
    query: { since, until },
  };
};

const buildVariables = (range: TimeRange) => {
  const { until, since } = range;

  return {
    endDate: until,
    startDate: since,
    siteTag: env.CLOUDFLARE_SITE_TAG,
    accountTag: env.CLOUDFLARE_ACCOUNT_TAG,
    hosts: [env.APP_URL.hostname, `www.${env.APP_URL.hostname}`],
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
  const timeRange = getTimeRange();

  const { data } = await graphql.query({
    query: ViewerTotalQuery,
    variables: buildVariables(timeRange),
  });

  const group = data?.viewer.accounts.at(0)?.total.at(0);

  return buildResultObject({
    pageviews: group?.count ?? 0,
    visitors: group?.sum.visits ?? 0,
  });
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

  const { data } = await graphql.query({
    query: ViewerLastAccessQuery,
    variables: buildVariables(timeRange),
  });

  const account = data?.viewer.accounts[0];
  const result = account?.lastAccess.map((access) => ({
    country: access.dimensions.countryName ?? 'unknown',
    pageviews: access.count,
    visitors: access.sum.visits,
    timestamp: access.dimensions.datetimeMinute,
  }));

  return buildResultObject(result ?? []);
};

import { DateTime } from 'luxon';

import { Separator } from '@/components/ui';
import {
  getViewerLastAccess,
  getViewerTotal,
  getVisitsAggregated,
  getVisitsCount,
} from '@/modules/analytics';
import { countries } from '@/utils/constants';

const getPortfolioStats = async () => {
  const [vercelCount, vercelVisits] = await Promise.all([
    getVisitsCount(),
    getVisitsAggregated(),
  ]);

  const [cloudflareCount, cloudflareVisits] = await Promise.all([
    getViewerTotal(),
    getViewerLastAccess(),
  ]);

  const totalVisitors = cloudflareCount.data.visitors || vercelCount.data.visitors;
  const totalPageviews = cloudflareCount.data.pageviews || vercelCount.data.pageviews;

  const pickLatestVisit = (data: typeof vercelVisits.data) => {
    return data
      .filter((bucket) => bucket.pageviews > 0 && Boolean(bucket.timestamp))
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
      .at(0);
  };

  const latestVercelVisit = pickLatestVisit(vercelVisits.data);
  const latestCloudflareVisit = pickLatestVisit(cloudflareVisits.data);

  const latestVisit = latestCloudflareVisit ?? latestVercelVisit;
  const latestCountry = countries.find(
    (country) => country.short_code.toLocaleLowerCase() === latestVisit?.country?.toLowerCase(),
  );

  const latestActivity = latestVisit?.timestamp
    ? DateTime.fromISO(latestVisit.timestamp).toFormat('LLL d, hh:mm a')
    : 'NO VISITS';

  return {
    totalVisitors,
    totalPageviews,
    latestActivity,
    latestVisitors: latestVisit?.visitors ?? 0,
    latestCountry: latestCountry?.name ?? '-',
  };
};

/* ///////////////////////////////////////////////// */

type PaddedCountProps = {
  value: number;
  length?: number;
};

const PaddedCount = ({ value, length = 3 }: PaddedCountProps) => {
  const raw = String(value);

  const padded = raw.padStart(length, '0');
  const zeros = padded.length - raw.length;

  return (
    <span className="font-medium font-mono text-2xl leading-none">
      <span className="sr-only">{raw} visits</span>
      <span aria-hidden className="text-foreground-soft">
        {padded.slice(0, zeros)}
      </span>
      <span aria-hidden className="text-foreground">
        {padded.slice(zeros)}
      </span>
    </span>
  );
};

type StatsShellProps = {
  from: string;
  last: string;
  visitors: number;
  loading?: boolean;
};

const StatsShell = (props: StatsShellProps) => {
  const { from, last, visitors, loading } = props;

  return (
    <div className="flex w-full items-center gap-x-5" aria-busy={loading}>
      <div className="flex flex-col items-stretch gap-x-1.5">
        <PaddedCount value={visitors} length={3} />
        <span
          aria-hidden
          className="text-center font-medium font-mono text-foreground-soft/56 text-xs uppercase"
        >
          VISITS
        </span>
      </div>
      <Separator.Root className="h-8 max-md:hidden" orientation="vertical" lighten />
      <dl className="flex flex-col gap-y-0.5 font-medium font-mono text-sm uppercase max-md:hidden">
        <div className="flex items-center">
          <dt className="inline-block w-13 text-foreground-soft">Last</dt>
          <dd className="text-foreground">{last}</dd>
        </div>
        <div className="flex items-center">
          <dt className="inline-block w-13 text-foreground-soft">From</dt>
          <dd className="text-foreground">{from}</dd>
        </div>
      </dl>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export const Stats = async () => {
  const { totalVisitors, latestActivity, latestCountry } = await getPortfolioStats();
  return <StatsShell from={latestCountry} last={latestActivity} visitors={totalVisitors} />;
};

/* ///////////////////////////////////////////////// */

export const Loading = () => {
  return <StatsShell from="-" last="NO VISITS" visitors={0} loading />;
};

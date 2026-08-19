import { DateTime } from 'luxon';

import { Separator } from '@/components/ui';
import { getVisitsCount } from '@/modules/vercel';
import { getVisitsAggregated } from '@/modules/vercel/actions/analytics';
import { countries } from '@/utils/constants';

const getPortfolioStats = async () => {
  const [count, aggregated] = await Promise.all([getVisitsCount(), getVisitsAggregated()]);

  const latest = aggregated.data
    .filter((bucket) => bucket.pageviews > 0 && Boolean(bucket.timestamp))
    .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
    .at(0);

  const latestCountry = countries.find(
    (country) => country.short_code.toLocaleLowerCase() === latest?.country?.toLowerCase(),
  );

  const latestActivity = latest?.timestamp
    ? DateTime.fromISO(latest.timestamp).toFormat('LLL d, hh:mm a')
    : 'NO VISITS';

  return {
    totalVisitors: count.data.visitors,
    totalPageviews: count.data.pageviews,
    latestActivity: latestActivity,
    latestVisitors: latest?.visitors ?? 0,
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
  loading?: boolean;
  pageviews: number;
};

const StatsShell = (props: StatsShellProps) => {
  const { from, last, pageviews, loading } = props;

  return (
    <div className="flex w-full items-center gap-x-5" aria-busy={loading}>
      <div className="flex flex-col items-baseline gap-x-1.5">
        <PaddedCount value={pageviews} length={3} />
        <span
          aria-hidden
          className="font-medium font-mono text-foreground-soft/56 text-xs uppercase"
        >
          VISITS
        </span>
      </div>
      <Separator.Root className="h-8" orientation="vertical" lighten />
      <dl className="flex flex-col gap-y-0.5 font-medium font-mono text-sm uppercase">
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
  const { totalPageviews, latestActivity, latestCountry } = await getPortfolioStats();
  return <StatsShell from={latestCountry} last={latestActivity} pageviews={totalPageviews} />;
};

/* ///////////////////////////////////////////////// */

export const Loading = () => {
  return <StatsShell from="-" last="NO VISITS" pageviews={0} loading />;
};

import { DateTime } from 'luxon';
import { headers } from 'next/headers';

import { Separator } from '@/components/ui';
import {
  getViewerLastAccess,
  getViewerTotal,
  getVisitsAggregated,
  getVisitsCount,
} from '@/modules/analytics';
import { countries } from '@/utils/constants';
import { log } from '@/utils/helpers';

const getPortfolioStats = async () => {
  const header = await headers();
  const timezone = header.get('x-vercel-ip-timezone') ?? 'UTC';

  const [vercelCount, vercelVisits, cloudflareCount, cloudflareVisits] = await Promise.all([
    getVisitsCount(),
    getVisitsAggregated(),
    getViewerTotal(),
    getViewerLastAccess(),
  ]);

  const resolveTotals = () => {
    if (cloudflareCount.version > 0) {
      return cloudflareCount.data;
    }

    if (vercelCount.version > 0) {
      log.warn('Cloudflare total unavailable, falling back to Vercel');
      return vercelCount.data;
    }

    log.error('Both analytics sources are unavailable');
    return { visitors: 0, pageviews: 0 };
  };

  const pickLatestVisit = <T extends { pageviews: number; timestamp?: string }>(data: T[]) => {
    return data
      .filter((bucket) => bucket.pageviews > 0 && Boolean(bucket.timestamp))
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
      .at(0);
  };

  const latestVisit = pickLatestVisit([
    ...(cloudflareVisits.version > 0 ? cloudflareVisits.data : []),
    ...(vercelVisits.version > 0 ? vercelVisits.data : []),
  ]);

  const totals = resolveTotals();

  const latestCountry = countries.find(
    (country) => country.short_code.toLocaleLowerCase() === latestVisit?.country?.toLowerCase(),
  );

  const latestActivity = latestVisit?.timestamp
    ? DateTime.fromISO(latestVisit.timestamp).setZone(timezone).toFormat('LLL d, hh:mm a')
    : 'No visits';

  return {
    totalVisitors: totals.visitors,
    totalPageviews: totals.pageviews,
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
  visits: number;
  loading?: boolean;
};

const StatsShell = (props: StatsShellProps) => {
  const { from, last, visits, loading } = props;

  const getSummary = () => {
    if (loading) {
      return 'Loading site statistics';
    }

    const plural = visits === 1 ? 'visit' : 'visits';
    const total = `About ${visits} ${plural} in the last 30 days.`;

    if (visits === 0) {
      return `${total} No visits recorded yet.`;
    }

    return `${total} Last visit ${last}, from ${from}.`;
  };

  return (
    <div className="flex w-full items-center gap-x-5" aria-busy={loading}>
      <span className="sr-only" aria-live="polite">
        {getSummary()}
      </span>
      <div className="flex flex-col items-stretch gap-x-1.5">
        <PaddedCount value={visits} length={3} />
        <span
          aria-hidden
          className="text-center font-medium font-mono text-foreground-soft/56 text-xs uppercase"
        >
          Visits
        </span>
      </div>
      <Separator.Root
        aria-hidden
        className="h-8 max-md:hidden"
        orientation="vertical"
        lighten
      />
      <dl
        aria-hidden
        className="flex flex-col gap-y-0.5 font-medium font-mono text-sm uppercase max-md:hidden"
      >
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
  return <StatsShell from={latestCountry} last={latestActivity} visits={totalPageviews} />;
};

/* ///////////////////////////////////////////////// */

export const Loading = () => {
  return <StatsShell from="-" last="No visits" visits={0} loading />;
};

import { DateTime, IANAZone } from 'luxon';
import { headers } from 'next/headers';

import { countries } from '@/constants/countries';

import { getVisitorsStats, getVisitorsVisit } from '../../services';
import { LatestAccess, TotalVisits } from './components';

/* ///////////////////////////////////////////////// */

const toTimezone = (timezone: string | null) => {
  return timezone && IANAZone.isValidZone(timezone) ? timezone : 'UTC';
};

const getCachedVisitors = async () => {
  const header = await headers();
  const timezone = toTimezone(header.get('x-vercel-ip-timezone'));

  const [stats, visit] = await Promise.all([
    getVisitorsStats(),
    getVisitorsVisit({ limit: 1 }),
  ]);

  if (!stats && !visit) {
    return null;
  }

  const latestActivity = visit?.visits.at(0);

  const toFormattedDate = (time: string) => {
    const date = DateTime.fromISO(time).setZone(timezone);

    if (!date.isValid) {
      return;
    }

    const now = DateTime.now().setZone(timezone);
    const diff = now.diff(date, ['days', 'hours', 'minutes']).toObject();

    if (now.diff(date, 'seconds').seconds < 60) {
      return 'Just now';
    }

    if ((diff.days ?? 0) < 1) {
      return date.toRelative({
        base: now,
        locale: 'en-US',
        unit: ['hours', 'minutes'],
      });
    }

    return date.toRelativeCalendar({
      base: now,
      locale: 'en-US',
    });
  };

  const getLatestDate = () => {
    if (!visit) {
      return undefined;
    }

    return latestActivity ? toFormattedDate(latestActivity.visited_at) : 'No visits';
  };

  const latestCountry = countries.find(
    (country) =>
      country.short_code.toLocaleLowerCase() === latestActivity?.country?.toLowerCase(),
  );

  return {
    totalVisitors: stats?.total ?? null,
    latestActivity: getLatestDate(),
    latestCountry: latestCountry?.long_code,
  };
};

/* ///////////////////////////////////////////////// */

export const Content = async () => {
  const visitors = await getCachedVisitors();

  const getSummary = () => {
    if (!visitors) {
      return 'No visits recorded yet';
    }

    const { totalVisitors, latestActivity, latestCountry } = visitors;
    const parts: string[] = [];

    if (totalVisitors !== null) {
      const plural = totalVisitors === 1 ? 'visit' : 'visits';
      parts.push(`About ${totalVisitors} ${plural} in the last 30 days.`);
    }

    if (totalVisitors === 0) {
      parts.push('No visits recorded yet.');
    } else if (latestActivity) {
      parts.push(
        `Last visit ${latestActivity}${latestCountry ? `, from ${latestCountry}` : ''}.`,
      );
    }

    return parts.join(' ');
  };

  if (!visitors) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-x-5">
      <span className="sr-only">{getSummary()}</span>

      <TotalVisits visits={visitors.totalVisitors} />
      <LatestAccess country={visitors.latestCountry} date={visitors.latestActivity} />
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export const Loading = () => {
  return (
    <div aria-hidden className="flex w-full items-center gap-x-5 motion-safe:animate-pulse">
      <div className="flex flex-col items-stretch gap-x-1.5">
        <span className="font-mono text-2xl leading-none font-medium text-foreground-soft">
          000
        </span>
        <span className="text-center font-mono text-xs font-medium text-foreground-soft/56 uppercase">
          Visits
        </span>
      </div>
      <dl className="flex flex-col gap-y-0.5 font-mono text-sm font-medium uppercase max-sm:hidden">
        <div className="flex items-center">
          <dt className="inline-block w-13 text-foreground-soft">Last</dt>
          <dd className="text-foreground-soft">-</dd>
        </div>
        <div className="flex items-center">
          <dt className="inline-block w-13 text-foreground-soft">From</dt>
          <dd className="text-foreground-soft">-</dd>
        </div>
      </dl>
    </div>
  );
};

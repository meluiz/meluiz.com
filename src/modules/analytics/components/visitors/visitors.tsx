import type { VisitorsSummary } from '../../services';

import { Fragment } from 'react';

import { getVisitorsSummary } from '../../services';
import { LatestAccess, RelativeDate, TotalVisits } from './components';
import { toRelativeDate } from './visitors.utils';

/* ///////////////////////////////////////////////// */

const getLatestDate = (summary: VisitorsSummary) => {
  const latest = summary.latest;

  if (!latest) {
    return undefined;
  }

  if (!latest.date) {
    return 'No visits';
  }

  const fallback = toRelativeDate(latest.date);

  if (!fallback) {
    return undefined;
  }

  return <RelativeDate iso={latest.date} fallback={fallback} />;
};

/* ///////////////////////////////////////////////// */

// Rendered into the static HTML; the pages using it revalidate on the same interval as the
// visitors service (see `revalidate` in app/(root)/(shell)/layout.tsx)
export const Content = async () => {
  const summary = await getVisitorsSummary();

  if (!summary) {
    return null;
  }

  const { total } = summary;

  const date = getLatestDate(summary);
  const country = summary.latest?.country ?? undefined;

  return (
    <div className="flex w-full items-center gap-x-5">
      <span className="sr-only">
        {total !== null &&
          `About ${total} ${total === 1 ? 'visit' : 'visits'} in the last 30 days. `}
        {total === 0 && 'No visits recorded yet.'}
        {total !== 0 && date && (
          <Fragment>
            Last visit {date}
            {country ? `, from ${country}` : ''}.
          </Fragment>
        )}
      </span>

      <TotalVisits visits={total} />
      <LatestAccess country={country} date={date} />
    </div>
  );
};

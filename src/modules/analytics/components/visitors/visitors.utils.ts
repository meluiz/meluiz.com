const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/* ///////////////////////////////////////////////// */

const relative = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

const toStartOfDay = (time: number) => {
  const date = new Date(time);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

/* ///////////////////////////////////////////////// */

// Calendar days follow the runtime's timezone: UTC on the server, the visitor's in the browser
export const toRelativeDate = (iso: string, now = Date.now()) => {
  const time = Date.parse(iso);

  if (Number.isNaN(time)) {
    return undefined;
  }

  const diff = now - time;

  if (diff < MINUTE) {
    return 'Just now';
  }

  if (diff < HOUR) {
    return relative.format(-Math.floor(diff / MINUTE), 'minute');
  }

  if (diff < DAY) {
    return relative.format(-Math.floor(diff / HOUR), 'hour');
  }

  const days = Math.round((toStartOfDay(now) - toStartOfDay(time)) / DAY);

  if (days < 7) {
    return relative.format(-days, 'day');
  }

  if (days < 30) {
    return relative.format(-Math.floor(days / 7), 'week');
  }

  if (days < 365) {
    return relative.format(-Math.floor(days / 30), 'month');
  }

  return relative.format(-Math.floor(days / 365), 'year');
};

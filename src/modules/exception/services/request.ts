import { DateTime, IANAZone } from 'luxon';
import { headers } from 'next/headers';

/* ///////////////////////////////////////////////// */

export interface RequestInfo {
  id: string | null;
  method: string;
  status: RequestStatus;
  referrer: string | null;
  edge: string | null;
  country: string | null;
  state: string | null;
  timestamp: RequestTimestamp;
}

export interface RequestStatus {
  code: number;
  text: string;
}

export interface RequestTimestamp {
  iso: string;
  label: string;
}

/* ///////////////////////////////////////////////// */

const toTimezone = (timezone: string | null) => {
  return timezone && IANAZone.isValidZone(timezone) ? timezone : 'UTC';
};

const toReferrer = (referrer: string | null) => {
  if (!referrer) {
    return null;
  }

  try {
    const url = new URL(referrer);
    return `${url.host}${url.pathname === '/' ? '' : url.pathname}`;
  } catch {
    return null;
  }
};

/* ///////////////////////////////////////////////// */

// `x-vercel-id` looks like `gru1::iad1::abcde-1730400000000-0123456789ab`
export const getRequestInfo = async (): Promise<RequestInfo> => {
  const header = await headers();

  const vercelId = header.get('x-vercel-id');
  const segments = vercelId?.split('::') ?? [];

  const timezone = toTimezone(header.get('x-vercel-ip-timezone'));
  const now = DateTime.now().setZone(timezone);

  return {
    id: segments.at(-1) || null,
    method: 'GET',
    referrer: toReferrer(header.get('referer')),
    edge: segments.at(0) || null,
    country: header.get('x-vercel-ip-country'),
    state: header.get('x-vercel-ip-country-region'),
    status: {
      code: 404,
      text: 'Not Found',
    },
    timestamp: {
      iso: now.toISO() ?? '',
      label: now.toFormat('yyyy-MM-dd HH:mm'),
    },
  };
};

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { env } from 'envin/env';
import { Fragment } from 'react';

import { Cloudflare, SelfHosted } from './components';

/* ///////////////////////////////////////////////// */

const IS_TRACKABLE = env.VERCEL_ENV === 'production';

/* ///////////////////////////////////////////////// */

export const Analytics = () => {
  if (!IS_TRACKABLE) {
    return null;
  }

  return (
    <Fragment>
      <SelfHosted />
      <VercelAnalytics />
      <Cloudflare token={env.CLOUDFLARE_TOKEN} />
    </Fragment>
  );
};

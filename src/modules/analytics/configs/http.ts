import env from 'envin/env';
import xior from 'xior';

import { paramsSerializer } from '@/configs/http';

export const visitors = xior.create({
  baseURL: 'https://visitors.meluiz.com',
  paramsSerializer,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${env.VISITORS_TOKEN}`,
  },
});

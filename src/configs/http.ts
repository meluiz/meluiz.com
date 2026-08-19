import axios from 'axios';
import { env } from 'envin/env';

export const vercel = axios.create({
  adapter: 'fetch',
  baseURL: 'https://api.vercel.com/v1',
  headers: {
    Authorization: `Bearer ${env.VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  },
  fetchOptions: {
    next: {
      revalidate: 60,
    },
  },
  paramsSerializer: {
    indexes: null,
  },
});

import { encodeParams } from 'xior';

/* ///////////////////////////////////////////////// */

export const paramsSerializer = (params: Record<string, any>) => {
  return encodeParams(params, true, null, {
    arrayFormat: 'repeat',
    serializeDate: (value) => value.toISOString(),
  });
};

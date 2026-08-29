import type { Dict, Merge } from '@motiro/types';

export const empty = <T extends Dict = Dict>(): T => Object.create(null) as T;

/* ///////////////////////////////////////////////// */

export const freeze = <T>(value: T): T => {
  return Object.freeze(value);
};

/* ///////////////////////////////////////////////// */

export const pick = <T extends Dict, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
  }

  return result;
};

/* ///////////////////////////////////////////////// */

export const omit = <T extends Dict, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> => {
  const excluded = new Set<PropertyKey>(keys);
  const entries = Object.entries(object).filter(([key]) => !excluded.has(key));

  return Object.fromEntries(entries) as Omit<T, K>;
};

/* ///////////////////////////////////////////////// */

type Assign<T extends readonly Dict[], Acc = {}> = T extends readonly [
  infer Head,
  ...infer Tail extends Dict[],
]
  ? Assign<Tail, Merge<Acc, Head>>
  : T extends readonly []
    ? Acc
    : Merge<Acc, T[number]>;

export const assign = <T extends readonly Dict[]>(...objects: T): Assign<T> => {
  return Object.assign(empty(), ...objects) as Assign<T>;
};

/* ///////////////////////////////////////////////// */

export const chunk = <T>(array: readonly T[], size: number): T[][] => {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError(`Chunk size must be a positive integer, received ${size}`);
  }

  const chunks: T[][] = new Array(Math.ceil(array.length / size));

  for (let idx = 0; idx < chunks.length; idx += 1) {
    chunks[idx] = array.slice(idx * size, idx * size + size);
  }

  return chunks;
};

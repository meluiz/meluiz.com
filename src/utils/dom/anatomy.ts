import { toKebabCase } from '@motiro/string';

export interface AnatomyPart {
  scope: string;
  part: string;
  selector: string;
  attrs: {
    'data-scope': string;
    'data-part': string;
  };
}

export interface Anatomy<T extends string> {
  name: string;
  keys: () => T[];
  build: () => Record<T, AnatomyPart>;
  rename: (name: string) => Anatomy<T>;
  extends: <U extends string>(...parts: U[]) => Anatomy<T | U>;
  omit: <U extends T>(...parts: U[]) => Anatomy<Exclude<T, U>>;
}

export interface AnatomyBuilder<T extends string> extends Anatomy<T> {
  parts: <U extends string>(...parts: U[]) => Anatomy<U>;
}

/* ///////////////////////////////////////////////// */

const toUniqueValues = <T>(values: T[]): T[] => {
  return [...new Set(values)];
};

export const createPart = (scope: string, name: string): AnatomyPart => {
  const part = toKebabCase(name);
  const attributes = `[data-scope="${scope}"][data-part="${part}"]`;

  return Object.freeze({
    scope,
    part,
    selector: `&${attributes}, & ${attributes}`,
    attrs: Object.freeze({ 'data-scope': scope, 'data-part': part }),
  });
};

export const createAnatomy = <T extends string>(
  name: string,
  parts: T[] = [],
): AnatomyBuilder<T> => {
  if (!toKebabCase(name)) {
    throw new Error('createAnatomy(name) requires a non-empty name.');
  }

  const keys = toUniqueValues(parts);

  let cache: Record<T, AnatomyPart> | undefined;

  return {
    name,
    keys: () => [...keys],
    rename: (value) => createAnatomy(value, keys),
    extends: <U extends string>(...values: U[]) => {
      return createAnatomy<T | U>(name, [...keys, ...values]);
    },
    parts: (...values) => {
      if (keys.length > 0) {
        throw new Error(
          `createAnatomy("${name}").parts(...) should only be called once. Did you mean to use .extends(...) ?`,
        );
      }

      return createAnatomy(name, values);
    },
    omit: <U extends T>(...values: U[]) => {
      const remaining = keys.filter((key): key is Exclude<T, U> => {
        return !values.includes(key as U);
      });

      return createAnatomy<Exclude<T, U>>(name, remaining);
    },
    build: () => {
      if (!cache) {
        const scope = toKebabCase(name);

        cache = Object.freeze(
          Object.fromEntries(keys.map((key) => [key, createPart(scope, key)])),
        ) as Record<T, AnatomyPart>;
      }

      return cache;
    },
  };
};

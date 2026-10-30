export const splitProps = <T extends object, const K extends readonly (keyof T)[]>(
  props: T,
  keys: K,
): [Pick<T, K[number]>, Omit<T, K[number]>] => {
  const picked: Record<PropertyKey, unknown> = {};
  const omitted: Record<PropertyKey, unknown> = {};

  for (const key in props) {
    if (keys.includes(key)) picked[key] = props[key];
    else omitted[key] = props[key];
  }

  return [picked as Pick<T, K[number]>, omitted as Omit<T, K[number]>];
};

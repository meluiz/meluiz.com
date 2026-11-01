export const freeze = <T>(value: T): T => {
  return Object.freeze(value);
};

export const cycle = <T>(values: readonly T[], current: T): T => {
  return values[(values.indexOf(current) + 1) % values.length] as T;
};

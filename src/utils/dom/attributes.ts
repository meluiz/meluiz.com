export type Booleanish = boolean | 'true' | 'false';

/* ///////////////////////////////////////////////// */

export const dataAttr = (guard: boolean | undefined): Booleanish => {
  return (guard ? '' : undefined) as Booleanish;
};

export const ariaAttr = (guard: boolean | undefined): Booleanish => {
  return (guard ? 'true' : undefined) as Booleanish;
};

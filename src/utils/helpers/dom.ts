import type React from 'react';

type ElementAttribute = React.HTMLAttributes<HTMLElement>;

/* ///////////////////////////////////////////////// */

type SplitPropsResult<Props, Keys extends readonly PropertyKey[]> = [
  Pick<Props, Extract<keyof Props, Keys[number]>>,
  Omit<Props, Extract<keyof Props, Keys[number]>>,
];

export const splitProps = <Props extends object, const Keys extends readonly (keyof Props)[]>(
  props: Props,
  keys: Keys,
): SplitPropsResult<Props, Keys> => {
  const target = {} as SplitPropsResult<Props, Keys>[0];
  const source = { ...props } as Props;

  for (const key of keys) {
    if (Object.hasOwn(source, key)) {
      Object.assign(target, {
        [key]: source[key],
      });
    }

    delete source[key];
  }

  return [target, source as SplitPropsResult<Props, Keys>[1]];
};

/* ///////////////////////////////////////////////// */

type AriaKeys<T> = Extract<keyof T, `aria-${string}`>;

type AriaAttributeOf<T> = Pick<T, AriaKeys<T>>;
type NonAriaAttributeOf<T> = Omit<T, AriaKeys<T>>;

type SplitAriaAttributeResult<T> = [AriaAttributeOf<T>, NonAriaAttributeOf<T>];

export const splitAriaAttribute = <T extends ElementAttribute>(
  props: T,
): SplitAriaAttributeResult<T> => {
  const ariaProps = {} as AriaAttributeOf<T>;
  const restProps = { ...props } as NonAriaAttributeOf<T>;

  for (const key of Object.keys(props) as Array<keyof T>) {
    if (typeof key === 'string' && key.startsWith('aria-')) {
      (ariaProps as T)[key] = props[key];
      delete (restProps as Partial<T>)[key];
    }
  }

  return [ariaProps, restProps];
};

/* ///////////////////////////////////////////////// */

type DataKeys<T> = Extract<keyof T, `data-${string}`>;

type DataAttributeOf<T> = Pick<T, DataKeys<T>>;
type NonDataAttributeOf<T> = Omit<T, DataKeys<T>>;

type SplitDataAttributeResult<T> = [DataAttributeOf<T>, NonDataAttributeOf<T>];

export const splitDataAttribute = <T extends ElementAttribute>(
  props: T,
): SplitDataAttributeResult<T> => {
  const dataProps = {} as DataAttributeOf<T>;
  const restProps = { ...props } as NonDataAttributeOf<T>;

  for (const key of Object.keys(props) as Array<keyof T>) {
    if (typeof key === 'string' && key.startsWith('data-')) {
      (dataProps as T)[key] = props[key];
      delete (restProps as Partial<T>)[key];
    }
  }

  return [dataProps, restProps];
};

/* ///////////////////////////////////////////////// */

type EnsureKeys<ExpectedKeys extends readonly (keyof Target)[], Target> =
  Exclude<keyof Target, ExpectedKeys[number]> extends never
    ? unknown
    : `Missing required keys: ${Exclude<keyof Target, ExpectedKeys[number]> & string}`;

export const createSplitProps = <Target extends object>() => {
  return <Props extends Target, const Keys extends readonly (keyof Target)[]>(
    props: Props,
    keys: Keys & EnsureKeys<Keys, Target>,
  ) => {
    return splitProps(props, keys);
  };
};

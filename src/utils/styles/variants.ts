import type {
  ComposableKindRecipe,
  ComposedVariants,
  RecipeConfig,
  RecipeVariants,
  VariantsOf,
} from '@lynstack/class-recipe';
import type { Dict } from '@motiro/types';

import { createRecipes } from '@lynstack/class-recipe';
import { createCn } from 'cnfast';

/* ///////////////////////////////////////////////// */

export type { VariantsOf };

export type StateClassName<S> = string | ((state: S) => string | undefined) | undefined;

type Recipe = (props?: any) => string;
type Props<R extends Recipe> = Omit<NonNullable<Parameters<R>[0]>, 'className'>;

type StateRecipe<R extends Recipe> = R & {
  <S>(props: Props<R> & { className: (state: S) => string | undefined }): (state: S) => string;
  <S>(props: Props<R> & { className?: StateClassName<S> }): string | ((state: S) => string);
};

/* ///////////////////////////////////////////////// */

const isInteger = (value: string) => {
  return /^\d+$/.test(value);
};

const isNumber = (value: string) => {
  return /^\d+(\.\d+)?$/.test(value);
};

const isArbitrary = (value: string) => {
  return /^\[.+\]$/.test(value);
};

const isArbitraryLength = (value: string) =>
  /^\[(?:(?:length|percentage):.+|-?[\d.]+(?:%|[a-z]+)|calc\(.+\))\]$/.test(value);

const isHatchColor = (value: string) => {
  return !/^(thickness|angle)-/.test(value) && !isNumber(value) && !isArbitraryLength(value);
};

const isBracketsColor = (value: string) => {
  return !isNumber(value) && !isArbitraryLength(value);
};

const originals = new WeakMap<object, any>();
const recipes = createRecipes({
  join: createCn({
    extend: {
      theme: {
        animate: ['blink'],
      },
      classGroups: {
        'bg-image': [{ bg: ['hatch'] }],
        'hatch-color': [{ hatch: [isHatchColor] }],
        'hatch-size': [{ hatch: [isNumber, isArbitraryLength] }],
        'hatch-thickness': [{ 'hatch-thickness': [isInteger, isArbitrary] }],
        'hatch-angle': [{ 'hatch-angle': [isInteger, isArbitrary] }],
        brackets: ['brackets'],
        'brackets-color': [{ brackets: [isBracketsColor] }],
        'brackets-gap': [{ brackets: [isNumber, isArbitraryLength] }],
        type: [
          {
            type: [
              'display',
              'display-sm',
              'text',
              'mono',
              'body',
              'body-sm',
              'heading',
              'label',
              'numeral',
              'value',
            ],
          },
        ],
      },
    },
  }),
});

/* ///////////////////////////////////////////////// */

export const cn = recipes.cx;
export const sva = recipes.sva;

export const cva = ((config: RecipeConfig<RecipeVariants, never>) => {
  const composes = config.composes?.map((recipe) => originals.get(recipe) ?? recipe);
  const recipe: Recipe = recipes.cva<RecipeVariants, never>({
    ...config,
    composes,
  } as typeof config);

  const resolver = (props?: Dict<unknown>) => {
    const className = props?.className;

    if (typeof className !== 'function') {
      return recipe(props);
    }

    return (state: unknown) => {
      return recipe({ ...props, className: className(state) });
    };
  };

  originals.set(resolver, recipe);

  return Object.assign(resolver, recipe);
}) as <
  const Variants extends RecipeVariants,
  const DefaultedName extends keyof ComposedVariants<Composed, Variants> = never,
  const Composed extends readonly ComposableKindRecipe<string>[] = readonly [],
>(
  config: RecipeConfig<Variants, DefaultedName, Composed>,
) => StateRecipe<ReturnType<typeof recipes.cva<Variants, DefaultedName, Composed>>>;

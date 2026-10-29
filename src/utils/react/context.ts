import type { Context } from 'react';

import React from 'react';

export interface CreateContextOptions<T> {
  name?: string;
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  defaultValue?: T;
}

export type ContextHook<T> = (consumerName?: string) => T;

export type CreateContextReturn<T, R> = readonly [Context<T | undefined>, ContextHook<R>];

export interface CreateContext {
  <T>(options?: CreateContextOptions<T> & { strict?: true }): CreateContextReturn<T, T>;
  <T>(
    options: CreateContextOptions<T> & { strict: false },
  ): CreateContextReturn<T, T | undefined>;
}

/* ///////////////////////////////////////////////// */

export const createContext = (<T>(options: CreateContextOptions<T> = {}) => {
  const {
    name,
    defaultValue,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
  } = options;

  const context = React.createContext<T | undefined>(defaultValue);

  if (name) {
    context.displayName = name;
  }

  const useContext = (consumerName?: string) => {
    const value = React.use(context);

    if (value === undefined && strict) {
      const reader = consumerName ? `\`${hookName}\`` : 'It';
      const subject = consumerName
        ? `\`${consumerName}\` was rendered`
        : `\`${hookName}\` was called`;

      throw new Error(
        `${subject} outside of \`${providerName}\`. ` +
          `${reader} reads a value that only \`<${providerName}>\` provides, ` +
          `so it has to be nested inside \`<${providerName}>\`.`,
      );
    }

    return value as T;
  };

  return [context, useContext] as const;
}) as CreateContext;

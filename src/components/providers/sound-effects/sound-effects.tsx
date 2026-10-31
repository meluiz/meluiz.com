import type React from 'react';

import { COOKIE_NAME, ContextProvider, toPreferences } from './components';

/* ///////////////////////////////////////////////// */

const getPreferences = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return toPreferences(cookieStore.get(COOKIE_NAME)?.value);
};

/* ///////////////////////////////////////////////// */

export interface ProviderProps {
  children?: React.ReactNode;
}

export const Provider = async (props: ProviderProps) => {
  const { children } = props;

  const preferences = await getPreferences();

  return <ContextProvider preferences={preferences}>{children}</ContextProvider>;
};

/* ///////////////////////////////////////////////// */

export { Script } from './sound-effects.script';

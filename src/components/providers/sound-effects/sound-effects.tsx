import type React from 'react';

import { ContextProvider } from './components';

/* ///////////////////////////////////////////////// */

export interface ProviderProps {
  children?: React.ReactNode;
}

// Preferences are read on the client only: the inline script mirrors them on the root before
// paint, so the server never touches cookies and pages stay static
export const Provider = (props: ProviderProps) => {
  const { children } = props;

  return <ContextProvider>{children}</ContextProvider>;
};

/* ///////////////////////////////////////////////// */

export { Script } from './sound-effects.script';

import type React from 'react';

import { ContextProvider } from './components';

/* ///////////////////////////////////////////////// */

export interface ProviderProps {
  children?: React.ReactNode;
}

// The theme is read on the client only: the inline script applies it before paint, so the
// server never touches cookies and pages stay static
export const Provider = (props: ProviderProps) => {
  const { children } = props;

  return <ContextProvider>{children}</ContextProvider>;
};

/* ///////////////////////////////////////////////// */

export { Script } from './color-scheme.script';

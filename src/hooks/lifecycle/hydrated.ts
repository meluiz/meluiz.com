import { useSyncExternalStore } from 'react';

/* ///////////////////////////////////////////////// */

const subscribe = () => () => {};

const getSnapshot = () => true;
const getServerSnapshot = () => false;

/* ///////////////////////////////////////////////// */

// `false` on the server and while hydrating, `true` right after, without an extra effect pass
export const useHydrated = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

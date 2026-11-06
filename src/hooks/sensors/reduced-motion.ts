import { useSyncExternalStore } from 'react';

/* ///////////////////////////////////////////////// */

const QUERY = '(prefers-reduced-motion: reduce)';

/* ///////////////////////////////////////////////// */

const subscribe = (callback: VoidFunction) => {
  const media = matchMedia(QUERY);

  media.addEventListener('change', callback);

  return () => {
    media.removeEventListener('change', callback);
  };
};

const getSnapshot = () => matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/* ///////////////////////////////////////////////// */

export const useReducedMotion = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

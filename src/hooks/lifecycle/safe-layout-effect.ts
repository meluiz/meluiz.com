import { useEffect, useLayoutEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

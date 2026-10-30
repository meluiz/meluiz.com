import type { UseSwapReturn } from './use-swap.ts';

import { createContext } from '@/utils/react';

export interface UseSwapContext extends UseSwapReturn {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  name: 'SwapContext',
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
});

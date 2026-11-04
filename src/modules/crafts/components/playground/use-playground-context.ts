import type { UsePlaygroundReturn } from './use-playground';

import { createContext } from '@/utils/react';

export interface UsePlaygroundContext extends UsePlaygroundReturn {}

export const [PlaygroundProvider, usePlaygroundContext] = createContext<UsePlaygroundContext>({
  name: 'PlaygroundContext',
  hookName: 'usePlaygroundContext',
  providerName: '<PlaygroundProvider />',
});

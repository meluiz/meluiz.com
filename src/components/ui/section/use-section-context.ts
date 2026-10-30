import type { UseSectionReturn } from './use-section';

import { createContext } from '@/utils/react';

export interface UseSectionContext extends UseSectionReturn {}

export const [SectionProvider, useSectionContext] = createContext<UseSectionContext>({
  name: 'SectionContext',
  hookName: 'useSectionContext',
  providerName: '<SectionProvider />',
});

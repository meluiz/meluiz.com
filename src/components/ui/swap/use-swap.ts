import type { UseTransitionStatusProps, UseTransitionStatusReturn } from '@/hooks/lifecycle';

import { useTransitionStatus } from '@/hooks/lifecycle';

export interface UseSwapReturn {
  swap: boolean;
  on: UseTransitionStatusReturn;
  off: UseTransitionStatusReturn;
}

export interface UseSwapProps
  extends Omit<UseTransitionStatusProps, 'open' | 'onOpenChangeComplete'> {
  swap?: boolean | undefined;
}

export const useSwap = (props: UseSwapProps): UseSwapReturn => {
  const { swap = false, ...transitionProps } = props;

  const on = useTransitionStatus({ ...transitionProps, open: swap });
  const off = useTransitionStatus({ ...transitionProps, open: !swap });

  return { swap, on, off };
};

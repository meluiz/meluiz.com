import { Tooltip } from '@base-ui/react';

export const HINT_HANDLE = Tooltip.createHandle<string>();

export const VOLUME_STEP = 5;
export const VOLUME_BARS = 10;

export const VOLUME_KEYS: Record<string, number> = {
  ArrowRight: VOLUME_STEP,
  ArrowUp: VOLUME_STEP,
  ArrowLeft: -VOLUME_STEP,
  ArrowDown: -VOLUME_STEP,
};

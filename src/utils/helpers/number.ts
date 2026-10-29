export interface ClampLimits {
  min?: number;
  max?: number;
}

export const clamp = (value: number, limits: ClampLimits): number => {
  const { min, max } = limits;

  if (min != null && max != null) {
    if (min > max) {
      throw new RangeError('Minimum value cannot be greater than maximum value.');
    }

    return Math.min(Math.max(value, min), max);
  }

  if (min != null) {
    return Math.max(value, min);
  }

  if (max != null) {
    return Math.min(value, max);
  }

  return value;
};

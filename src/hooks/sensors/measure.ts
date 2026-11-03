import React from 'react';

/* ///////////////////////////////////////////////// */

export interface Measure {
  width: number | undefined;
  height: number | undefined;
}

/* ///////////////////////////////////////////////// */

const EMPTY_MEASURE: Measure = {
  width: undefined,
  height: undefined,
};

/* ///////////////////////////////////////////////// */

export type UseMeasureReturn = [ref: React.RefCallback<HTMLElement | null>, measure: Measure];

export const useMeasure = (): UseMeasureReturn => {
  const [measure, setMeasure] = React.useState<Measure>(EMPTY_MEASURE);

  const cached = React.useRef<Measure>(EMPTY_MEASURE);

  const dispatch = (measure: Partial<Measure>) => {
    const payload = {
      ...cached.current,
      ...measure,
    };

    if (payload.width !== cached.current.width || payload.height !== cached.current.height) {
      setMeasure(payload);

      cached.current = {
        ...cached.current,
        ...measure,
      };
    }
  };

  const container: React.RefCallback<HTMLElement | null> = (node) => {
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();

    dispatch({
      width: rect.width,
      height: rect.height,
    });

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        const borderBoxSize = entry.borderBoxSize[0];
        const contentRect = entry.contentRect;

        const elementWidth = borderBoxSize.inlineSize ?? contentRect.width;
        const elementHeight = borderBoxSize.blockSize ?? contentRect.height;

        dispatch({
          width: elementWidth,
          height: elementHeight,
        });
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  };

  return [container, measure];
};

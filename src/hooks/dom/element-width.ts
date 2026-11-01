import React from 'react';

export const useElementWidth = () => {
  const [width, setWidth] = React.useState<number>();

  const ref = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setWidth(entry.borderBoxSize[0]?.inlineSize ?? entry.contentRect.width);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  };

  return [width, ref] as const;
};

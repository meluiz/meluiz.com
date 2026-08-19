import React from 'react';

import { parts } from './separator.anatomy';

export interface UseSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
}

export type UseSeparatorReturn = ReturnType<typeof useSeparator>;

export const useSeparator = (props: UseSeparatorProps = {}) => {
  const { orientation = 'horizontal' } = props;

  const getRootProps = React.useMemo(() => {
    return () => ({
      ...parts.root.attrs,
      'aria-orientation': orientation,
      'data-orientation': orientation,
      role: 'separator',
    });
  }, [orientation]);

  return {
    getRootProps,
  };
};

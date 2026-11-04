import React from 'react';

export type UsePlaygroundReturn = ReturnType<typeof usePlayground>;

export const usePlayground = () => {
  const labelId = React.useId();

  const [toolbarRef, setToolbarRef] = React.useState<HTMLDivElement | null>(null);
  const [statusBarRef, setStatusBarRef] = React.useState<HTMLSpanElement | null>(null);

  return { labelId, statusBarRef, toolbarRef, setStatusBarRef, setToolbarRef };
};

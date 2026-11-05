import React from 'react';

export type UsePlaygroundReturn = ReturnType<typeof usePlayground>;

export type StatusStore = ReturnType<typeof createStatusStore>;

const createStatusStore = () => {
  let value: React.ReactNode = null;
  let seeded = false;

  const listeners = new Set<VoidFunction>();

  return {
    get: () => value,
    seed: (next: React.ReactNode) => {
      if (seeded) {
        return;
      }

      seeded = true;
      value = next;
    },
    set: (next: React.ReactNode) => {
      seeded = true;

      if (Object.is(value, next)) {
        return;
      }

      value = next;

      for (const listener of listeners) {
        listener();
      }
    },
    subscribe: (listener: VoidFunction) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
};

export const usePlayground = () => {
  const labelId = React.useId();

  const [toolbarRef, setToolbarRef] = React.useState<HTMLDivElement | null>(null);
  const [status] = React.useState(createStatusStore);

  return { labelId, status, toolbarRef, setToolbarRef };
};

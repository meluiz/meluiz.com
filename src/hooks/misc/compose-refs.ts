type PossibleRef<T> = React.Ref<T | null> | undefined;

export const composeRefs = <T>(...refs: PossibleRef<T>[]): React.RefCallback<T> => {
  return (node) => {
    const cleanups: VoidFunction[] = [];
    let hasCustomCleanup = false;

    for (const ref of refs) {
      if (typeof ref === 'function') {
        const callback = ref(node);

        if (typeof callback === 'function') {
          hasCustomCleanup = true;
          cleanups.push(callback);
        } else {
          cleanups.push(() => ref(null));
        }
      } else if (ref) {
        ref.current = node;

        cleanups.push(() => {
          ref.current = null;
        });
      }
    }

    if (hasCustomCleanup) {
      return () => {
        for (const cleanUp of cleanups) {
          cleanUp();
        }
      };
    }
  };
};

export const useComposeRefs = <T>(...refs: PossibleRef<T>[]): React.RefCallback<T> => {
  return composeRefs(...refs);
};

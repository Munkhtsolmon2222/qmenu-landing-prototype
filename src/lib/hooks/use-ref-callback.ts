import { useCallback, useRef } from 'react';

export const useRefCallback = <T>(defaultValue?: T) => {
  const ref = useRef<T>(defaultValue ?? null);

  const setRef = useCallback((node: T) => {
    ref.current = node;
  }, []);

  return { ref, setRef };
};

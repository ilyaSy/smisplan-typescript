import { useCallback, useEffect, useState } from 'react';

import { createObserver } from 'utils';

export const useUpdateStateViaObserver = <T extends any>(observer: ReturnType<typeof createObserver>) => {
  const [state, setState] = useState<T>();

  const updateHandler = useCallback((newValue: any) => setState(newValue), []);

  useEffect(() => {
    observer.subscribe(updateHandler);

    return () => observer.unsubscribeAll();
  }, [observer, updateHandler]);

  return state;
};

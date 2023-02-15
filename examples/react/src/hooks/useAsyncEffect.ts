import { DependencyList, useEffect } from "react";

export const useAsyncEffect = (
  asyncCallable: () => Promise<void>,
  deps: DependencyList
): void => {
  useEffect(() => {
    asyncCallable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

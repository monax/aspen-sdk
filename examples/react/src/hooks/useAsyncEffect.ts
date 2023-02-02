import { DependencyList, useEffect } from "react";

export const useAsyncEffect = (
  asyncCallable: () => Promise<void>,
  deps: DependencyList
): void => {
  useEffect(() => {
    asyncCallable();
  }, deps);
};

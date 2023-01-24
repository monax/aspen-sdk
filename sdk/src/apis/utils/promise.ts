// TODO: remove this polyfill when using node >= v15. Promise.any not supported until node v15:
//   (see compat chart: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
export function promiseAny<T>(values: Promise<T>[]): Promise<T> {
  // Promise.all gives us first rejection which is actually first fulfilment, then flip again to emit that rejection
  // as fulfilment
  return flipPromise(Promise.all(values.map((v) => flipPromise(v)))).catch((errs) =>
    Promise.reject(new AggregateError(errs)),
  ) as Promise<T>;
}

export class AggregateError extends Error {
  constructor(public readonly errors: unknown[]) {
    super(`All promises rejected: [${errors.map((err) => String(err)).join(', ')}]`);
  }
}

// Map rejection to fulfilment and fulfilment to rejection
function flipPromise<T>(promise: Promise<T>): Promise<unknown> {
  return new Promise((resolve, reject) => promise.then(reject, resolve));
}

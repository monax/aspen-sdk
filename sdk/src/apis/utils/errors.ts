type Obj = Record<string, unknown>;

export function getInnermostError<T>(err: T): Obj | undefined {
  while (err) {
    const innerErr = (err as Obj).error;
    if (typeof innerErr !== 'object') {
      return err;
    }
  }
}

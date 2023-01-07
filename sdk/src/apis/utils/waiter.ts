const defaultWaitForSuccessConfig = {
  sleepMs: 1000,
  // 20 minutes
  timeoutMs: 1000 * 60 * 20,
  logger: console.error,
};

export type StatusResponse<TStatus> = { status?: TStatus | undefined; message?: string | null };

export async function waitForSuccess<TArgs extends unknown[], TStatus, TResponse extends StatusResponse<TStatus>>(
  config: {
    timeoutMs?: number;
    sleepMs?: number;
    successStatus: TStatus;
    errorStatus: TStatus;
    logger?: (msg: string) => void;
  },
  getter: (...args: TArgs) => Promise<TResponse>,
  ...args: TArgs
): Promise<TResponse> {
  const { timeoutMs, sleepMs, successStatus, errorStatus, logger } = { ...defaultWaitForSuccessConfig, ...config };
  const timeout = sleep(timeoutMs, false);
  let status: TStatus | undefined = undefined;
  let message = '';
  while (await Promise.race([sleep(sleepMs, true).sleeper, timeout.sleeper])) {
    const resp = await getter(...args);
    status = resp.status;
    if (resp.message != message) {
      logger(`${resp.message} (current status: '${status}')`);
      message = resp.message ?? '';
    }
    if (status === errorStatus) {
      timeout.cancel();
      throw new Error(resp.message ?? 'no error message');
    } else if (status === successStatus) {
      timeout.cancel();
      return resp;
    }
    logger(`Waiting for status '${successStatus}' (current status: '${status}')`);
  }
  throw new Error(`Timed out waiting ${getter.name} for success after ${timeoutMs}ms`);
}

function sleep(ms: number, value = true): { sleeper: Promise<boolean>; cancel: () => void } {
  let cancel = (): void => undefined;
  return {
    sleeper: new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(value), ms);
      cancel = () => clearTimeout(timeout);
    }),
    cancel,
  };
}

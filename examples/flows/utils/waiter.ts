import { PublishingAPI, StatusResponse, waitForSuccess } from '@monaxlabs/aspen-sdk/dist/apis';

export function waitForCompletion<T extends unknown[], TResponse extends StatusResponse<PublishingAPI.QueueStatus>>(
  getter: (...args: T) => Promise<TResponse>,
  ...args: T
): Promise<TResponse> {
  return waitForSuccess(
    {
      successStatus: PublishingAPI.QueueStatus.COMPLETED,
      errorStatus: PublishingAPI.QueueStatus.ERROR,
    },
    getter,
    ...args,
  );
}

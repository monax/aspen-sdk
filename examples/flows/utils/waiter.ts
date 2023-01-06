import { PublishingAPI } from '@monaxlabs/aspen-sdk';

export function waitForCompletion<
  T extends unknown[],
  TResponse extends ApiUtils.StatusResponse<PublishingAPI.QueueStatus>,
>(getter: (...args: T) => Promise<TResponse>, ...args: T): Promise<TResponse> {
  return ApiUtils.waitForSuccess(
    {
      successStatus: PublishingAPI.QueueStatus.COMPLETED,
      errorStatus: PublishingAPI.QueueStatus.ERROR,
    },
    getter,
    ...args,
  );
}

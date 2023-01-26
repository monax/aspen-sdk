import { CollectionContract, OperationStatus } from '..';
import { SdkError, SdkErrorCode } from '../errors';

export class ContractObject {
  public constructor(protected readonly base: CollectionContract) {}

  protected async do<T>(task: () => Promise<T>): Promise<OperationStatus<T>> {
    try {
      const result = await task();
      return { success: true, result };
    } catch (err) {
      if (SdkError.is(err)) {
        return { success: false, error: err };
      } else {
        return { success: false, error: new SdkError(SdkErrorCode.UNKNOWN_ERROR, undefined, err as Error) };
      }
    }
  }
}

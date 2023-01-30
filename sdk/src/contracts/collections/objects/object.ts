import { CollectionContract, OperationStatus } from '..';
import { SdkError, SdkErrorCode } from '../errors';

export class ContractObject {
  public constructor(protected readonly base: CollectionContract) {}

  protected async do<T>(task: () => Promise<T>): Promise<OperationStatus<T>> {
    try {
      const result = await task();
      return { success: true, result, error: null };
    } catch (err) {
      const error = SdkError.is(err) ? err : new SdkError(SdkErrorCode.UNKNOWN_ERROR, undefined, err as Error);
      return { success: false, result: null, error };
    }
  }
}

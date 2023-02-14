import { CollectionContract, OperationStatus } from '..';
import { SdkError, SdkErrorCode } from '../errors';

export class ContractObject {
  public constructor(protected readonly base: CollectionContract) {}

  protected async run<T>(task: () => Promise<T>): Promise<OperationStatus<T>> {
    try {
      const result = await task();
      return { success: true, result, error: null };
    } catch (err) {
      return { success: false, result: null, error: SdkError.from(err, SdkErrorCode.UNKNOWN_ERROR) };
    }
  }
}

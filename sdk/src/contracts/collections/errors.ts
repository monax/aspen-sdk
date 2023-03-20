export enum SdkErrorCode {
  FAILED_TO_LOAD_FEATURES = 'Failed to load contract features.',
  EMPTY_TOKEN_STANDARD = "Couldn't identify a token standard",
  FEATURE_NOT_SUPPORTED = 'This feature is not supported by the contract',
  FUNCTION_NOT_SUPPORTED = 'Function is not supported by the contract',
  FUNCTION_NOT_IMPLEMENTED = 'Function is not implemented',
  CHAIN_ERROR = 'A call to the chain failed',
  WEB_REQUEST_FAILED = 'Web request failed!',
  TOKEN_ID_REQUIRED = 'Token Id is required to call the function on this contract!',
  TOKEN_ID_REJECTED = 'Token Id is not supported for this function on this contract!',
  INVALID_DATA = 'Invalid input data provided!',
  UNKNOWN_ERROR = 'Unknown error.',
}

export class SdkError extends Error {
  constructor(
    code: SdkErrorCode,
    public readonly data: Record<string, unknown> = {},
    public readonly error: Error | null = null,
  ) {
    super(code);

    this.name = 'SdkError';
  }

  static is(err: unknown): err is SdkError {
    return typeof err === 'object' && (err as SdkError).name === 'SdkError';
  }

  static from(err: unknown, code: SdkErrorCode, data?: Record<string, unknown>): SdkError {
    // TODO - parse the error if code == SdkErrorCode.CHAIN_ERROR
    return SdkError.is(err) ? err : new SdkError(code, data, err as Error);
  }
}

export enum SdkErrorCode {
  FAILED_TO_LOAD_FEATURES = 'Failed to load contract features.',
  EMPTY_TOKEN_STANDARD = "Couldn't identify a token standard",
  FEATURE_NOT_SUPPORTED = 'This feature is not supported by the contract',
  CHAIN_ERROR = 'A call to the chain failed',
  WEB_REQUEST_FAILED = 'Web request failed!',
  MISSING_TOKEN_ID = 'Token ID is required!',
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
}

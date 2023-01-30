export enum SdkErrorCode {
  FEATURE_NOT_SUPPORTED = 'This feature is not supported by the contract',
  CHAIN_ERROR = 'A call to the chain failed',
  UNSUPPORTED_TOKEN_STANDARD = 'Unsupported token standard',
  TOKEN_ID_REQUIRED_FOR_ERC1155 = 'Token is required for ERC1155 contracts!',
  WEB_REQUEST_FAILED = 'Web request failed!',
  INVALID_DATA = 'Invalid input data provided!',
  UNKNOWN_ERROR = 'Unknown error.',
  FAILED_TO_LOAD_FEATURES = 'Failed to load contract features.',
  EMPTY_TOKEN_STANDARD = "Couldn't identify a token standard",
  FAILED_TO_LOAD_METADATA = 'Failed to get metadata',
  MISSING_TOKEN_ID = 'Token ID is required!',
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

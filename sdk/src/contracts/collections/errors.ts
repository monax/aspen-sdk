export enum SdkErrorCode {
  FEATURE_NOT_SUPPORTED = 'This feature is not supported by the contract',
  CHAIN_ERROR = 'A call to the chain failed',
  UNSUPPORTED_TOKEN_STANDARD = 'Unsupported token standard',
  TOKEN_ID_REQUIRED_FOR_ERC1155 = 'Token is required for ERC1155 contracts!',
  WEB_REQUEST_FAILED = 'Web request failed!',
  INVALID_DATA = 'Invalid input data provided!',
}

/**
 * Details:
 * - 'input' - errors thrown for invalid data input
 * - 'feature' - errors thrown when a feature is not available
 * - 'request' - errors thrown on HTTP(S) request errors
 * - 'chain' - errors thrown on chain errors
 */
export type SdkErrorSource = 'input' | 'feature' | 'request' | 'chain';

export class SdkError extends Error {
  constructor(
    code: SdkErrorCode,
    public readonly source: SdkErrorSource,
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

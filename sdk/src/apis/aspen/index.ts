import { ApiClientOptions, getApiClient, RichApiClient } from '@monaxlabs/phloem/dist/api';
import { pathMeta } from './aspen';

export * from './aspen';

export type AspenClient = RichApiClient<typeof pathMeta>;

export const AspenClient = Object.freeze({
  new(options: ApiClientOptions): AspenClient {
    return getApiClient(pathMeta, options);
  },
  pathMeta,
});

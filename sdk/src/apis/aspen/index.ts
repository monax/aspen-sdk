import { ApiClient, ApiClientOptions } from '@monaxlabs/phloem/dist/api';
import { pathMeta } from './aspen';

export * from './aspen';

export class AspenClient extends ApiClient<typeof pathMeta> {
  constructor(options: ApiClientOptions) {
    super(pathMeta, options);
  }
}

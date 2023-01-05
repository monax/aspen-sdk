import * as t from 'io-ts';
import { Readable, ReadableOptions } from 'stream';
import { UtilityService } from '@monaxlabs/aspen-sdk/src/apis/publishing';
import { parse } from '@monaxlabs/aspen-sdk';

export interface NamedReadable extends Readable {
  readonly name: string;
  readonly filename: string;
}

// Attaching 'name' to a stream is sufficient to induce form-data to add the appropriate Content-Disposition header
// for the 'filename' (without which multer will ignore any multipart file data). See:
// https://github.com/form-data/form-data/blob/55d90ce4a4c22b0ea0647991d85cb946dfb7395b/lib/form_data.js#L230
// NOTE: [Silas] setting filename for good luck, not sure if this works from browser where we don't use the FormData
// polyfill
export function namedReadableFrom(
  name: string,
  iterable: Iterable<any> | AsyncIterable<any>,
  options?: ReadableOptions,
): NamedReadable {
  const stream = Readable.from(iterable, options);
  return extendWithPrototype({ name, filename: name }, stream);
}

// Cannot get type inference to correctly infer keys from the Provider type (inference over class types seem flaky
// in general), so Object works here
// eslint-disable-next-line @typescript-eslint/ban-types
function extendWithPrototype<TObj, TProto extends Object>(
  obj: TObj,
  proto: TProto,
): TObj & TProto & { __extendWithPrototype: true } {
  // Proxy everything other than what is defined on obj to proto
  return Object.assign(Object.create(proto), obj, { __extendWithPrototype: true });
}

export const PostFileResponse = t.type({
  web2Url: t.string,
  ipfsUrl: t.string,
  contentType: t.string,
  extension: t.string,
});

export type PostFileResponse = t.TypeOf<typeof PostFileResponse>;

// FIXME: this subverts the typesystem because the generated code we have here does not work in an Node environemtn
export function coerceToBlob(iterable: Iterable<any> | AsyncIterable<any>, filename?: string): Blob {
  if (!(iterable instanceof Readable)) {
    if (!filename) {
      throw new Error(`Please provide a filename so the iterable can be converted to a named stream`);
    }
    iterable = namedReadableFrom(filename, iterable);
  }
  return iterable as unknown as Blob;
}

export async function uploadFile(
  iterable: Iterable<any> | AsyncIterable<any>,
  filename?: string,
): Promise<PostFileResponse> {
  const jsonPretendingToBeString = await UtilityService.postUtilityFiles({
    formData: { file: coerceToBlob(iterable, filename) },
  });
  return parse(PostFileResponse, jsonPretendingToBeString);
}

import { pipe } from 'fp-ts/lib/function';
import { match } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { formatValidationErrors } from 'io-ts-reporters';

import { JsonFromString } from 'io-ts-types';

export type JsonArray = Json[];

export type JsonRecord = { [key: string]: Json };

export type Json = null | boolean | number | string | JsonArray | JsonRecord;

export const JsonRecord: t.Type<JsonRecord> = t.recursion('JsonRecord', () => t.record(t.string, Json));

export const JsonArray: t.Type<JsonArray> = t.recursion('JsonArray', () => t.array(Json));

export const Json: t.Type<Json> = t.union([t.null, t.boolean, t.number, t.string, JsonArray, JsonRecord]);

export const JsonString = t.string.pipe(JsonFromString);

export function parseFromString<T>(schema: t.Type<T, Json>, payload: string): T {
  return parse(JsonString.pipe(schema), payload);
}

export function parse<T, O, I>(
  schema: t.Type<T, O, I>,
  payload: I,
  ...validators: ((payload: T) => string | undefined)[]
): T {
  return parseThenOrElse(
    schema,
    payload,
    (t) => t,
    (errs) => {
      throw new Error(
        `Failed to parse payload: ${JSON.stringify(payload, null, 2)}\nErrors:\n${formatValidationErrors(errs)}`,
      );
    },
    ...validators,
  );
}

// Parses a value with the given schema and return the value of then(t: T) if it succeeds or orElse(errs: Errors) if it
// fails.
export function parseThenOrElse<T, O, I, V, D>(
  schema: t.Type<T, O, I>,
  payload: I,
  then: (t: T) => V,
  orElse: (errs: t.Errors) => D,
  ...validators: ((payload: T) => string | undefined)[]
): V | D {
  return pipe(
    payload,
    schema.decode,
    match<t.Errors, T, V | D>(orElse, (parsed: T) => {
      const validationErrors = validators.map((v) => v(parsed)).filter(Boolean);
      if (validationErrors.length) {
        throw new Error(
          `Invalid payload: ${JSON.stringify(payload, null, 2)}\nErrors:\n${validationErrors.join('\n')}`,
        );
      }
      return then(parsed);
    }),
  );
}

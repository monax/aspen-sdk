import { promises as fs } from 'fs';
import * as t from 'io-ts';
import { parse } from './schema';

export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} not set and no default provided`);
    }
    return defaultValue;
  }
  return value;
}

export function liftEnv<T = string>(key: string, lift: (s: string) => T, defaultValue?: T): T {
  const value = process.env[key];
  if (!value) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} not set and no default provided`);
    }
    return defaultValue;
  }
  return lift(value);
}

export async function parseFromEnvOrFile<T, O>(
  schema: t.Type<T, O, string>,
  file: string,
  envVarName: string,
): Promise<T> {
  let js = getEnv(envVarName, '');
  if (!js) {
    const exists = await fileExists(file);
    if (!exists) {
      throw new Error(`Neither environment variable '${envVarName}' set or file '${file}' present`);
    }
    const buf = await fs.readFile(file);
    js = buf.toString();
  }
  return parse(schema, js);
}

async function fileExists(file: string): Promise<boolean> {
  return fs
    .access(file)
    .then(() => true)
    .catch(() => false);
}

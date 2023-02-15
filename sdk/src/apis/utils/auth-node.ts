import { JsonFromString } from 'io-ts-types';
import * as path from 'path';
import { AspenEnvironment, EnvCredentials } from '..';
import { authenticateAll } from './auth';
import { parseFromEnvOrFile } from './environment';

// A JSON object of type EnvCredentials is expected to be saved here (ignored from repo)
const defaultCredentialsFile = 'credentials.json';
const defaultCedentialsEnvVarName = 'CREDENTIALS_JSON';

// FIXME: rename to reflect env var usage, move environment to last arg and default to 'production'
export async function authenticateAllFromFile(
  environment: AspenEnvironment,
  credentialsFile = defaultCredentialsFile,
  credentialsEnvVarName = defaultCedentialsEnvVarName,
): Promise<void> {
  const envCreds = await parseFromEnvOrFile(
    JsonFromString.pipe(EnvCredentials),
    credentialsFile,
    credentialsEnvVarName,
  );

  const creds = envCreds[environment];
  if (!creds) {
    throw new Error(
      `No environment credentials for environment '${environment}' defined at ${path.resolve(defaultCredentialsFile)}`,
    );
  }
  await authenticateAll(creds);
}

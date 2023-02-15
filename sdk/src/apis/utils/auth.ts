import { JsonFromString } from 'io-ts-types';
import * as path from 'path';
import { AspenEnvironment, Credential, Credentials, EnvCredentials, GatingAPI, PublishingAPI } from '..';
import { parseFromEnvOrFile } from './environment';

// A JSON object of type EnvCredentials is expected to be saved here (ignored from repo)
const defaultCredentialsFile = 'credentials.json';
const defaultCedentialsEnvVarName = 'CREDENTIALS_JSON';

// Authenticate the API in a global state (which is horrible, but hey)
export async function authenticateAll({ publishing, gating }: Credentials): Promise<void> {
  await authenticate(PublishingAPI.OpenAPI, publishing);
  await authenticate(GatingAPI.OpenAPI, gating);
}

export async function authenticate(
  config: PublishingAPI.OpenAPIConfig & GatingAPI.OpenAPIConfig,
  { baseUrl, name, password }: Credential,
): Promise<string> {
  config.BASE = baseUrl;
  const accessToken = await PublishingAPI.AuthService.postAuth({
    requestBody: { name, password },
  });
  const token = accessToken.replace('Bearer ', '');
  config.TOKEN = token;
  return token;
}

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

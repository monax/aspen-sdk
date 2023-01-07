import * as t from 'io-ts';
import { JsonFromString } from 'io-ts-types';
import * as path from 'path';
import { GatingAPI, PublishingAPI } from '..';
import { parseFromEnvOrFile } from './environment';

const Credential = t.type({
  baseUrl: t.string,
  name: t.string,
  password: t.string,
});

type Credential = t.TypeOf<typeof Credential>;

const Credentials = t.type({
  gating: Credential,
  publishing: Credential,
});

type Credentials = t.TypeOf<typeof Credentials>;

export const EnvCredentials = t.partial({
  staging: Credentials,
  develop: Credentials,
  production: Credentials,
  localhost: Credentials,
});

type EnvCredentials = t.TypeOf<typeof EnvCredentials>;

export type AspenEnvironment = keyof EnvCredentials;
export const AspenEnvironment = t.keyof(EnvCredentials.props);

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

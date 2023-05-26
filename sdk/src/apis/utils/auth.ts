import { Credential, Credentials, GatingAPI, IdentityAPI } from '..';

// Authenticate the API in a global state (which is horrible, but hey)
export async function authenticateAll({ publishing, gating }: Credentials): Promise<void> {
  await authenticate(IdentityAPI.OpenAPI, publishing);
  await authenticate(GatingAPI.OpenAPI, gating);
}

export async function authenticate(
  config: IdentityAPI.OpenAPIConfig & GatingAPI.OpenAPIConfig,
  { baseUrl, name, password }: Credential,
): Promise<string> {
  // FIXME: update to use API keys
  throw new Error(`Authentication needs to be implemented using API keys`)
  // config.BASE = baseUrl;
  // const accessToken = await PublishingAPI.AuthService.postAuth({
  //   requestBody: { name, password },
  // });
  // const token = accessToken.replace('Bearer ', '');
  // config.TOKEN = token;
  // return token;
}

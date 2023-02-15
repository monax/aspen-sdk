import { Credential, Credentials, GatingAPI, PublishingAPI } from '..';

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

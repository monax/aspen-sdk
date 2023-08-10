import { Signer } from 'ethers';
import { OidcClient, SigninResponse } from 'oidc-client-ts';
import { GatingAPI, IdentityAPI } from '..';

// Authenticate the API in a global state (which is horrible, but hey)
export async function authenticateAll({ apiKey }: { apiKey: string }): Promise<void> {
  await authenticate(IdentityAPI.OpenAPI, apiKey);
  await authenticate(GatingAPI.OpenAPI, apiKey);
}

export async function authenticate(
  config: IdentityAPI.OpenAPIConfig & GatingAPI.OpenAPIConfig,
  apiKey: string,
): Promise<string> {
  // FIXME: update to use API keys
  throw new Error(`Authentication needs to be implemented using API keys`);
  // config.BASE = baseUrl;
  // const accessToken = await PublishingAPI.AuthService.postAuth({
  //   requestBody: { name, password },
  // });
  // const signInRequest = await oidcClient.createSigninRequest({
  //   extraQueryParams: {
  //     connection: 'CryptoWallet',
  //     chainId: chainId,
  //     connectorType: walletConnectorType,
  //     address: account,
  //     nonce: nonce,
  //     signature: signature,
  //     redirectMode: 'clientCode',
  //     prompt: 'login',
  //   },
  // });

  // const [requestUri, queryString] = signInRequest.url.split('?');
  // const authParams = new URLSearchParams(queryString);
  // const token = accessToken.replace('Bearer ', '');
  // config.TOKEN = token;
  // return token;
}

export type IdentityClientConfig = {
  identityServiceHost: string;
  clientId: string;
  redirectUri: string;
};

export async function walletLogin(signer: Signer, identityClient: OidcClient): Promise<SigninResponse> {
  const walletAddress = await signer.getAddress();
  const chainId = await signer.getChainId();

  const { signpad, nonce } = await IdentityAPI.WalletService.getIdentitySignpad({ address: walletAddress });

  const signature = await signer.signMessage(signpad);

  const request = await identityClient.createSigninRequest({
    extraQueryParams: {
      connection: 'CryptoWallet',
      connectorType: 'MetaMask',
      address: walletAddress,
      nonce,
      chainId,
      signature: signature,
      redirectMode: 'clientCode',
      prompt: 'login', //[OAUth2 prompt]enforces new login session, if there is already an active one in identity service then it's destroyed
    },
  });

  const [requestUri, authParams] = request.url.split('?');

  const authorizationResponse = await fetch(requestUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include', //this is required for SSO - this way the cookie from the identity server is set properly
    body: authParams,
  });

  if (authorizationResponse.status != 200) {
    //handle validation errors - invalid login attempt somehow
    const message = await authorizationResponse.text();
    throw new Error(`HTTP Error ${authorizationResponse.status}: ${message}`);
  }

  const authorizationRedirect = await authorizationResponse.json();

  const signinResponse = await identityClient.processSigninResponse(authorizationRedirect.redirectUri);
  IdentityAPI.OpenAPI.BASE = identityClient.settings.authority;
  IdentityAPI.OpenAPI.TOKEN = signinResponse.access_token;
  return signinResponse;
}

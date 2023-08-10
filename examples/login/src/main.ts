import { OidcClient, UserManager, UserProfile } from 'oidc-client-ts';

const identityServiceHost = 'https://identity.aspenft.io';
const thisAppHost = 'https://localhost:8001';
const redirectUri = 'https://localhost:8001/callback.html';

const config = {
  authority: identityServiceHost,
  client_id: 'js-demo',
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: 'openid profile offline_access',
  post_logout_redirect_uri: `${thisAppHost}/index.html`,
};

const client = new OidcClient(config);
const mgr = new UserManager(config);

function log(...args: unknown[]) {
  const results = document.getElementById('results');
  if (!results) {
    console.error('No results element for logging');
    return;
  }
  results.innerText = '';

  Array.prototype.forEach.call(args, function (msg) {
    if (typeof msg !== 'undefined') {
      if (msg instanceof Error) {
        msg = 'Error: ' + msg.message;
      } else if (typeof msg !== 'string') {
        msg = JSON.stringify(msg, null, 2);
      }
      results.innerText += msg + '\r\n';
    }
  });
}

document.getElementById('login')?.addEventListener('click', login, false);
document
  .getElementById('wallet-login')
  ?.addEventListener('click', walletLoginPostNoRedirectWithIdentityCookieSession, false);
document.getElementById('wallet-login-ropf')?.addEventListener('click', walletLoginResourceOwnerPwdFlow, false);
document.getElementById('google-login')?.addEventListener('click', googleLogin, false);
document.getElementById('password-login')?.addEventListener('click', passwordLogin, false);
document.getElementById('add-discord')?.addEventListener('click', linkDiscordAccount, false);
document.getElementById('api')?.addEventListener('click', api, false);
document.getElementById('logout')?.addEventListener('click', /*logout*/ logoutWithoutRedirect, false);

verifyEmailIfVerificationTokenPresentInUrl();

mgr.events.addUserSignedOut(function () {
  log('User signed out of Identity Server');
});

mgr.getUser().then(function (user) {
  if (user) {
    log('User logged in', user.profile);
  } else {
    log('User not logged in');
  }
});

function login() {
  mgr.signinRedirect();
}

async function verifyEmailIfVerificationTokenPresentInUrl() {
  // get decoded search params
  const params = new URL(document.location.toString()).searchParams;
  if (params.has('email_token') && params.has('email')) {
    const body = {
      email: params.get('email'),
      token: params.get('email_token'),
      sendWelcomeEmail: true,
    };

    console.log(params.get('email_token'));

    const resp = await fetch(`${identityServiceHost}/profile/email/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (resp.status != 200) {
      //handle validation errors - invalid login attempt somehow
      alert(await resp.text());
      return;
    } else {
      alert('Email verified');
    }
  }
}

//demonstrates quick redirect login, where no user action is required in the identity server's UI
//as wallet signature is obtained here

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function walletLogin() {
  const ethereum = window.ethereum;
  if (!ethereum) {
    console.error('No ethereum provider found, please install Metamask or other wallet');
    return;
  }

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const walletAddress = accounts[0];

  //get signpad from identity service
  const signpadResponse = await fetch(`${identityServiceHost}/wallet/signpad/${walletAddress}`);

  const jsonResult = await signpadResponse.json();
  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [jsonResult.signpad, walletAddress, ''],
  });
  console.log(signature);

  //TODO - we should use [POST] for 'embedded' wallet authentication, same way as password login does
  await mgr.signinRedirect({
    extraQueryParams: {
      connection: 'WalletConnect',
      address: walletAddress,
      nonce: jsonResult.nonce,
      signature: signature,
    },
  });
}

//demonstrates quick redirect login, where no user action is required in the identity server's UI
//as user is redirected to the external provider automatically
async function googleLogin() {
  mgr.signinRedirect({
    extraQueryParams: {
      connection: 'ExternalLogin',
      provider: 'google',
    },
  });
}

function isInput(elem: HTMLElement): elem is HTMLInputElement {
  return (elem as HTMLInputElement).value !== undefined;
}

function mustGetInput(id: string): HTMLInputElement {
  const input = document.getElementById(id);
  if (!input) {
    throw new Error('Could not get input: ' + id);
  }
  if (!isInput(input)) {
    throw new Error('Element "' + id + '" is not an input');
  }
  return input;
}

//demonstrates quick redirect login, where no user action is required in the identity server's UI
//as email and password are passed from the form in this app
async function passwordLogin() {
  const email = mustGetInput('email-input').value;
  const password = mustGetInput('password-input').value;

  const request = await client.createSigninRequest({
    extraQueryParams: {
      connection: 'Password',
      email: email,
      password: password,
      //this way we won't receive 302 redirect response, where it's impossible to read the 'location header'
      //(https://github.com/whatwg/fetch/issues/763)
      redirectMode: 'clientCode',
    },
  });

  const splittedRequestUrl = request.url.split('?');
  const requestUri = splittedRequestUrl[0];
  const authParams = new URLSearchParams(splittedRequestUrl[1]);

  //submit form 'embedded login' approach
  //await embeddedLoginWithSubmitForm(requestUri, authParams);

  // fetch [POST] 'embedded login' approach,
  // we shouldn't use [GET] for password auth as password would be exposed in the query params that way
  const authorizationResponse = await fetch(requestUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include', //this is required for SSO - this way the cookie from the identity server is set properly
    body: authParams,
  });

  if (authorizationResponse.status == 400) {
    //handle validation errors - invalid login attempt somehow
    alert(await authorizationResponse.text());
    return;
  }

  const authorizationRedirect = await authorizationResponse.json();
  console.log(`Redirecting to ${authorizationRedirect.redirectUri}`);
  window.location.href = authorizationRedirect.redirectUri;

  // THIS IS ANOTHER WAY TO GET THE ACCESS TOKEN WITHOUT REDIRECT,
  // BUT THE USER MANAGER 'mgr' METHODS ARE NOT WORKING THIS WAY,
  // AS THE USER THERE IS NEVER INITIALIZED
  // var signInResponse = await client.processSigninResponse(authorizationRedirect.RedirectUri);
  // console.log(signInResponse); //contains access_token, refresh_token etc...
}

async function walletLoginResourceOwnerPwdFlow() {
  const ethereum = window.ethereum;
  if (!ethereum) {
    console.error('No ethereum provider found, please install Metamask or other wallet');
    return;
  }

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const walletAddress = accounts[0];

  //get signpad from identity service
  const signpadResponse = await fetch(`${identityServiceHost}/wallet/signpad/${walletAddress}`);

  const jsonResult = await signpadResponse.json();
  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [jsonResult.signpad, walletAddress, ''],
  });
  console.log(signature);

  const tokenResponse = await client.processResourceOwnerPasswordCredentials({
    extraTokenParams: {
      connection: 'CryptoWallet',
      connectorType: 'MetaMask',
      address: walletAddress,
      nonce: jsonResult.nonce,
      signature: signature,
    },
    username: 'IGNORED',
    password: 'IGNORED',
  });

  console.log(tokenResponse);
  //token response should be persisted, so we can use the refresh token
  //before access tokens expires - see tokenResponse.expires_at

  console.log('getting new token with the provided refresh_token');
  const refreshToken = tokenResponse.refresh_token;
  if (!refreshToken) {
    throw new Error('No refresh token found in the token response');
  }
  const newTokenResponse = await client.useRefreshToken({
    state: {
      data: undefined,
      session_state: null,
      // Typings are unhelpful/wrong here
      profile: undefined as unknown as UserProfile,
      refresh_token: refreshToken,
      scope: '', //scope is encoded in the refresh_token
    },
  });

  console.log(newTokenResponse);
}

async function walletLoginPostNoRedirectWithIdentityCookieSession() {
  const ethereum = window.ethereum;
  if (!ethereum) {
    console.error('No ethereum provider found, please install Metamask or other wallet');
    return;
  }

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const walletAddress = accounts[0];
  const chainId = await ethereum.request({ method: 'eth_chainId' });

  //get signpad from identity service
  const signpadResponse = await fetch(`${identityServiceHost}/wallet/signpad/${walletAddress}`);

  const jsonResult = await signpadResponse.json();
  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [jsonResult.signpad, walletAddress, ''],
  });
  console.log(signature);

  const request = await client.createSigninRequest({
    extraQueryParams: {
      connection: 'CryptoWallet', //[custom] when connection specified, user is not redirected to the identity server's login page
      connectorType: 'MetaMask', //wallet login
      address: walletAddress, //wallet login
      nonce: jsonResult.nonce, //wallet login
      chainId,
      signature: signature, //wallet login
      redirectMode: 'clientCode', //[custom]avoid automatic server-side redirect, provide redirectUrl in the response instead
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
    alert('foo: ' + authorizationResponse.status);
    alert(await authorizationResponse.text());
    return;
  }

  const authorizationRedirect = await authorizationResponse.json();
  log(authorizationRedirect);
  const signInResponse = await client.processSigninResponse(authorizationRedirect.redirectUri);
  log('User logged in with identity server (check the app cookies). \nSigning response', signInResponse);
}

/**
 * The main drawback of executing embedded login with submit form that points
 * directly to the connect/authorize action method is that in case of unexpected error,
 * the user is not redirected successfully to the client app's redirect URI, but error page from the
 * identity server itself is displayed
 */
async function embeddedLoginWithSubmitForm(requestUri: string, authParams: [string, string][]): Promise<void> {
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', requestUri);

  for (const [key, value] of authParams) {
    //for the form to work as expected we need to follow the regular redirect functionality
    if (key == 'redirectMode') {
      continue;
    }
    addHiddenFieldToForm(key, value, form);
  }

  document.body.appendChild(form);

  //before submitting the form we should
  //validate password with an API call, otherwise we will get an error page
  form.submit();
}

function addHiddenFieldToForm(key: string, value: string, form: HTMLFormElement) {
  const hiddenField = document.createElement('input');
  hiddenField.setAttribute('type', 'hidden');
  hiddenField.setAttribute('name', key);
  hiddenField.setAttribute('value', value);
  form.appendChild(hiddenField);
}

function linkDiscordAccount() {
  //before doing this we the app should check if the user is signed in to avoid redirect to login page
  //and that he doesn't have google login already
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', `${identityServiceHost}/account/addExternalLogin`);
  addHiddenFieldToForm('provider', 'discord', form);
  addHiddenFieldToForm('returnUrl', thisAppHost, form);
  document.body.appendChild(form);
  form.submit();
}

function logout() {
  mgr.signoutRedirect();
}

//this should logout the user (destroy the cookie session)
async function logoutWithoutRedirect() {
  const logoutResponse = await fetch(`${identityServiceHost}/connect/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include', //this is required for SSO - this way the cookie from the identity server is set properly
  });

  if (logoutResponse.status != 200) {
    //handle validation errors - invalid login attempt somehow
    alert(await logoutResponse.text());
    return;
  }

  log('User logged out. Identity session ended (check the app cookies)');
}

function api() {
  mgr.getUser().then(function (user) {
    if (!user) {
      throw new Error('User not logged in');
    }
    const url = `${identityServiceHost}/connect/userinfo`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      log(xhr.status, JSON.parse(xhr.responseText));
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + user.access_token);
    xhr.send();
  });
}

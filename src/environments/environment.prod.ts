export const environment = {
  production: true,
  envName: 'prod',
  baseUrl: 'http://app.toucantesting.com/',
  apiUrl: 'http://api.toucantesting.com/',
  auth0Config: {
    clientID: 'wlV8bhQ158TpK45z8b4Fv94znnQYill6',
    domain: 'toucantesting.auth0.com',
    responseType: 'token id_token',
    audience: 'http://api.toucantesting.com',
    redirectUri: 'http://app.toucantesting.com/',
    scope: 'openid profile'
  }
};

export const environment = {
  production: false,
  envName: 'dev',
  baseUrl: 'http://localhost:4200/',
  apiUrl: 'http://localhost:5000/',
  auth0Config: {
    clientID: 'wlV8bhQ158TpK45z8b4Fv94znnQYill6',
    domain: 'toucantesting.auth0.com',
    responseType: 'token id_token',
    audience: 'http://api.toucantesting.com',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid profile'
  }
};

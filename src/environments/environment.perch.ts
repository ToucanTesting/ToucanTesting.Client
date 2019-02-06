export const environment = {
  production: true,
  envName: 'perch',
  baseUrl: 'https://as-toucan-rj-perch-tst-wu2.azurewebsites.net/',
  apiUrl: 'https://api-toucan-rj-perch-tst-wu2.azurewebsites.net/',
  auth0Config: {
    clientID: 'iTtN5x2QyMYAHu0O6B3i50iKQibYnBUf',
    domain: 'royal-jay.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api-toucan-rj-perch-tst-wu2.azurewebsites.net',
    redirectUri: 'https://as-toucan-rj-perch-tst-wu2.azurewebsites.net/',
    scope: 'openid profile'
  }
};

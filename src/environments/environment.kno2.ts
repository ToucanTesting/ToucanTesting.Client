export const environment = {
  production: true,
  envName: 'kno2',
  baseUrl: 'https://as-kno2toucanweb-dev.azurewebsites.net/',
  apiUrl: 'https://as-kno2toucanapi-dev.azurewebsites.net/',
  auth0Config: {
    clientID: 'zU64NlkREL6oEpORfGPEjQPSlIuYjYhA',
    domain: 'royal-jay.auth0.com',
    responseType: 'token id_token',
    audience: 'https://as-kno2toucanapi-dev.azurewebsites.net',
    redirectUri: 'https://as-kno2toucanweb-dev.azurewebsites.net/',
    scope: 'openid profile'
  }
};

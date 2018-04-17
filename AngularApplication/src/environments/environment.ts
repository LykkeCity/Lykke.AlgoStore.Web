export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200/devapi', // proxies requests to 'https://api-dev.lykkex.net/api'
  apiAuthUrl: 'https://auth-dev.lykkex.net',
  applicationId: '62b4815e-3762-4cf2-bad1-876a1feabeb7',
  redirectUrl: 'http://localhost:4200/',

  // storeApiUrl: 'http://algo-store-api.lykke-algo-store.svc.cluster.local/api',
  storeApiUrl: 'http://localhost:5555/api',
  apiV2Url: 'https://apiv2-dev.lykkex.net/api/',
  authUrl: 'http://localhost:5000/api/home/authentication',
  tokenUrl: 'https://auth-dev.lykkex.net/getlykkewallettoken',
  idleTime: 300,
  idleTimeout: 60
};

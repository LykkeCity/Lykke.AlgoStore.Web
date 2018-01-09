// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The trading-list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api-dev.lykkex.net/api',
  apiAuthUrl: 'https://auth-dev.lykkex.net',
  applicationId: '0707736a-9c20-4845-bdb4-8ef3b761af95',
  redirectUrl: 'http://algo-store-web.lykke-algo-store.svc.cluster.local/',

  storeApiUrl: 'http://algo-store-api.lykke-algo-store.svc.cluster.local/api',
  authUrl: 'http://algo-store-web.lykke-algo-store.svc.cluster.local/api/home/authentication',
  tokenUrl: 'https://auth-dev.lykkex.net/getlykkewallettoken',
  idleTime: 300,
  idleTimeout: 60
};

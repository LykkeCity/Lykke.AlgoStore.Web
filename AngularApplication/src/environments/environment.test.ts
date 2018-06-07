// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The trading-list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.lykkex.net/api',
  apiAuthUrl: 'https://auth-test.lykkex.net',
  applicationId: '405712da-62b2-4231-85d3-de868a1e78a5',
  redirectUrl: 'http://algo-store-web.algo-store.svc.cluster.local/',

  storeApiUrl: 'http://algo-store-api.algo-store.svc.cluster.local/api',
  apiV2Url: 'https://apiv2-test.lykkex.net/api/',
  authUrl: 'http://algo-store-web.algo-store.svc.cluster.local/api/home/authentication',
  tokenUrl: 'https://auth-test.lykkex.net/getlykkewallettoken',
  idleTime: 300,
  idleTimeout: 60
};

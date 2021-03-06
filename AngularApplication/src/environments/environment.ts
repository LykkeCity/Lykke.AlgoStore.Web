export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200/devapi', // proxies requests to 'https://api-dev.lykkex.net/api'
  apiAuthUrl: 'https://auth-dev.lykkex.net',
  applicationId: '62b4815e-3762-4cf2-bad1-876a1feabeb7',
  redirectUrl: 'http://localhost:4200/',

  wsUrl: 'ws://algo-store-api.lykke-algo-store.svc.cluster.local/live',
  storeApiUrl: 'http://algo-store-api.lykke-algo-store.svc.cluster.local/api',
  walletApiUrl: 'https://webwallet-dev.lykkex.net/wallets/hft',
  authUrl: 'http://localhost:5000/api/home/authentication',
  tokenUrl: 'https://auth-dev.lykkex.net/getlykkewallettoken',
  idleTime: 1800, // 30 minutes
  idleTimeout: 60
};

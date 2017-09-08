// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false
  , API_DOMAIN: 'http://localhost:3000'
  , CLIENT_API_URL: '/api/client/'
  , SERVICE_API_URL: '/api/service/'
  , CURRENCY_API_URL: '/api/currency/'
  , TRANSLATE_API_URL: '/api/translate'
};

export const API_URLS = {
    CLIENT: environment.API_DOMAIN + environment.CLIENT_API_URL
  , SERVICE: environment.API_DOMAIN + environment.SERVICE_API_URL
  , CURRENCY: environment.API_DOMAIN + environment.CURRENCY_API_URL
  , TRANSLATE: environment.API_DOMAIN + environment.TRANSLATE_API_URL
};

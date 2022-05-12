// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Local
  // API: 'http://localhost:8080',
  API: 'http://agricolab-env-1.eba-stu3nrzp.us-east-1.elasticbeanstalk.com',
  GEO_API: 'http://api.positionstack.com/v1/forward',
  GEO_API_MAPTILER: 'https://api.maptiler.com/geocoding',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

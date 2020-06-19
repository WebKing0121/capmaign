// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:4000',
  apiUrl: 'https://c2cstaging.azurewebsites.net',
  facebook: {
    key: '207295506697224',
    secret: '3bc0fa39d51400b541e81ea6dc43d9ae',
  },
  twitter: {
    key: 'jPDQUcm5wAQ5fgC0KbhZleYHS',
    secret: 'TZeIgggMQ21w5pXHZSK5XyqoiJTKZ6uiFCsF5cOqxDxkb2onFa'
  },
  linkedin: {
    key: '78vtjon3z2nf2f',
    secret: 'BNzKZXFf370aHo7m'
  },
  google_plus: {
    key: '81ndqcu6k0d6r0',
    secret: 'vdJ045x6R5bS2sRC'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

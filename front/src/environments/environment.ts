// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: "dev",
  baseUrl: 'http://localhost:3000/api',
  website: 'Insurance Site',

  REVIEW_Url: "https://apiasan.asanbime.com/api",
  IDENTITY_Url: "https://apiidentity.asanbime.com",
  ORDERING_Url: "https://apiordering.asanbime.com/api",
  LOCATION_Url: "https://apilocation.asanbime.com/api",
  PAYMENT_Url: "https://apipayment.asanbime.com/api",
  REMINDER_Url: "https://apireminder.asanbime.com/api",
  PROFILE_Url: "https://apiprofile.asanbime.com/api",
  MESSAGING_Url: "https://apimessaging.asanbime.com/api",
  CDN: "https://apicdn.asanbime.com",
  POLICY: "https://apipolicy.asanbime.com/api",
  ImageResourcesAdress: "https://apiasan.asanbime.com/images",
  CLIENT_ID: "IAWapp",
  CLIENT_SECRET: "secret",
  GRANT_TYPE: "password",
  SCOPE: "openid thirdpersoninsuranceadminapi cdn policies profile orders payments locations profiles reviews identities reminders messages roles",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost/api-rest/',
  urlrouteaccount: 'App-Account',
  urlroutetransaction : 'App-Transaction',
  //Alert Account
  messagePresentAlertAccount: '¿Desea Eliminar la Cuenta?',
  messageSuccess : '¡Felicidades!',
  messageSuccessAccount : 'Cuenta Eliminada Correctamente',
  messageErrorAccountHeader : '¡Error! Al Eliminar Cuenta',
  messageErrorAccountTitle : 'Intente Nuevamente',
  messageErrorRedHeader : '¡Error!',
  messageErrorRedTitle : 'Compruebe su Conexión de Internet',
  //Alert Transaction
  messagePresentTransaction: '¿Desea Cancelar la Transacción?',
  messageSuccessTransaction : 'Transacción Cancelada Exitosamente',
  messageErrorTransactionHeader : '¡Error! Al Cancelar la Transacción',
  messageErrorTransactionTitle : 'No se ha Podido Cancelar la Transacción'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

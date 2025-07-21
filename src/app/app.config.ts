import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { HttpClientModule, HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { employeesReducer } from './employees/employees.reducer';
import { EmployeesEffects } from './employees/employees.effects';
import { API_URL } from './shared/api.token';
import { loggingInterceptor  } from 'my-lib';


import { tap } from 'rxjs';

// function loggingInterceptor(
//   request: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ) {
//   // const req = request.clone({
//   //   headers: request.headers.set('X-DEBUG', 'TESTING')
//   // });
//   console.log('[Outgoing Request]');
//   console.log(request);
//   return next(request).pipe(
//     tap({
//       next: event => {
//         if (event.type === HttpEventType.Response) {
//           console.log('[Incoming Response]');
//           console.log(event.status);
//           console.log(event.body);
//         }
//       }
//     })
//   );
// }


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideStore({ employees: employeesReducer }),
    provideEffects([EmployeesEffects]),
    [provideHttpClient(withInterceptors([loggingInterceptor]))],
    { provide: API_URL, useValue: 'https://dummyjson.com' }
  ]
};







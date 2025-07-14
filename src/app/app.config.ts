import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { employeesReducer } from './employees/employees.reducer';
import { EmployeesEffects } from './employees/employees.effects';
import { API_URL } from './shared/api.token';

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
    { provide: API_URL, useValue: 'https://dummyjson.com' }
  ]
};







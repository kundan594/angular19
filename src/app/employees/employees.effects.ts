import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from './employee.service';
import * as EmployeesActions from './employees.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EmployeesEffects {
  loadEmployees$;

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {
    this.loadEmployees$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EmployeesActions.loadEmployees),
        mergeMap(action =>
          this.employeeService.getEmployees(action.page, action.itemsPerPage).pipe(
            map(res => EmployeesActions.loadEmployeesSuccess({ users: res.users, total: res.total })),
            catchError(error => of(EmployeesActions.loadEmployeesFailure({ error })))
          )
        )
      )
    );
  }
}

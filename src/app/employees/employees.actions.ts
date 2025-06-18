import { createAction, props } from '@ngrx/store';
import { DummyUser } from './employee.service';

export const loadEmployees = createAction('[Employees] Load Employees', props<{ page: number, itemsPerPage: number }>());
export const loadEmployeesSuccess = createAction('[Employees] Load Employees Success', props<{ users: DummyUser[], total: number }>());
export const loadEmployeesFailure = createAction('[Employees] Load Employees Failure', props<{ error: any }>());

export const setEmployeeFilter = createAction('[Employees] Set Filter', props<{ gender: string }>());
export const setEmployeePage = createAction('[Employees] Set Page', props<{ page: number }>());

import { createReducer, on } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';
import { DummyUser } from './employee.service';

export interface EmployeesState {
  users: DummyUser[];
  total: number;
  loading: boolean;
  error: any;
  filter: string;
  page: number;
  itemsPerPage: number;
}

export const initialState: EmployeesState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  filter: '',
  page: 1,
  itemsPerPage: 50,
};

export const employeesReducer = createReducer(
  initialState,
  on(EmployeesActions.loadEmployees, (state, { page, itemsPerPage }) => ({
    ...state,
    loading: true,
    error: null,
    page,
    itemsPerPage
  })),
  on(EmployeesActions.loadEmployeesSuccess, (state, { users, total }) => ({
    ...state,
    users,
    total,
    loading: false
  })),
  on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(EmployeesActions.setEmployeeFilter, (state, { gender }) => ({
    ...state,
    filter: gender,
    page: 1 // reset to first page on filter
  })),
  on(EmployeesActions.setEmployeePage, (state, { page }) => ({
    ...state,
    page
  }))
);

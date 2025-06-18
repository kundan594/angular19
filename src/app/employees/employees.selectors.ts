import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesState } from './employees.reducer';

export const selectEmployeesState = createFeatureSelector<EmployeesState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  (state) => state.users
);

export const selectEmployeesTotal = createSelector(
  selectEmployeesState,
  (state) => state.total
);

export const selectEmployeesLoading = createSelector(
  selectEmployeesState,
  (state) => state.loading
);

export const selectEmployeesError = createSelector(
  selectEmployeesState,
  (state) => state.error
);

export const selectEmployeesFilter = createSelector(
  selectEmployeesState,
  (state) => state.filter
);

export const selectEmployeesPage = createSelector(
  selectEmployeesState,
  (state) => state.page
);

export const selectEmployeesItemsPerPage = createSelector(
  selectEmployeesState,
  (state) => state.itemsPerPage
);

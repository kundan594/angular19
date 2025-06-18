import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { DummyUser } from './employee.service';
import * as EmployeesActions from './employees.actions';
import * as fromEmployees from './employees.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule, FormsModule, PaginationComponent],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  users$!: Observable<DummyUser[]>;
  total$!: Observable<number>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  filter$!: Observable<string>;
  selectedPosition$!: Observable<string>;
  page$!: Observable<number>;
  itemsPerPage$!: Observable<number>;
  currentPage = 1;
  positions$!: Observable<string[]>;
  filteredUsers$!: Observable<DummyUser[]>;
  private subscriptions = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.users$ = this.store.select(fromEmployees.selectAllEmployees);
    this.total$ = this.store.select(fromEmployees.selectEmployeesTotal);
    this.loading$ = this.store.select(fromEmployees.selectEmployeesLoading);
    this.error$ = this.store.select(fromEmployees.selectEmployeesError);
    this.filter$ = this.store.select(fromEmployees.selectEmployeesFilter);
    this.selectedPosition$ = this.filter$;
    this.page$ = this.store.select(fromEmployees.selectEmployeesPage);
    this.itemsPerPage$ = this.store.select(fromEmployees.selectEmployeesItemsPerPage);

    // Add positions$ observable for dropdown
    this.positions$ = this.users$.pipe(
      map(users => Array.from(new Set(users.map(user => user.gender))))
    );

    // Add filtered users observable
    this.filteredUsers$ = combineLatest([this.users$, this.filter$]).pipe(
      map(([users, filter]) => filter ? users.filter(u => u.gender === filter) : users)
    );

    // Keep currentPage in sync with currentPage$
    this.subscriptions.add(
      this.page$.subscribe(page => this.currentPage = page)
    );

    // Initial load
    this.store.dispatch(EmployeesActions.loadEmployees({ page: 1, itemsPerPage: 50 }));
  }

  onPositionChange(gender: string) {
    this.store.dispatch(EmployeesActions.setEmployeeFilter({ gender }));
    this.store.dispatch(EmployeesActions.loadEmployees({ page: 1, itemsPerPage: 50 }));
  }

  onPageChange(page: number) {
    this.store.dispatch(EmployeesActions.setEmployeePage({ page }));
    this.itemsPerPage$.subscribe(itemsPerPage => {
      this.store.dispatch(EmployeesActions.loadEmployees({ page, itemsPerPage }));
    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
import { Component, OnInit } from '@angular/core';
import { EmployeeService, DummyUser, DummyUserResponse } from './employee.service';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule, FormsModule, PaginationComponent],
})

export class EmployeesComponent implements OnInit {
  selectedPosition$ = new BehaviorSubject<string>('');
  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage = 50;

  // Store the latest API response
  response$!: Observable<DummyUserResponse>;
  users$!: Observable<DummyUser[]>;
  positions$!: Observable<string[]>;
  total$!: Observable<number>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.response$ = combineLatest([
      this.currentPage$,
      this.selectedPosition$
    ]).pipe(
      switchMap(([page, position]) =>
        this.employeeService.getEmployees(page, this.itemsPerPage).pipe(
          map(res => {
            // If filtering by position, filter users client-side
            const users = position ? res.users.filter(u => u.gender === position) : res.users;
            return { ...res, users };
          })
        )
      )
    );

    this.users$ = this.response$.pipe(map(res => res.users));
    this.positions$ = this.response$.pipe(
      map(res => Array.from(new Set(res.users.map(u => u.gender))))
    );
    this.total$ = this.response$.pipe(map(res => res.total));
  }

  onPositionChange(position: string) {
    this.currentPage$.next(1);
    this.selectedPosition$.next(position);
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
  }
}
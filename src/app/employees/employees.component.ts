import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  employees$!: Observable<Employee[]>;
  positions$!: Observable<string[]>;
  filteredEmployees$!: Observable<Employee[]>;
  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage = 2;
  pagedEmployees$!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();

    this.positions$ = this.employees$.pipe(
      map((employees: Employee[]) => Array.from(new Set(employees.map(emp => emp.position))))
    );    

    this.filteredEmployees$ = combineLatest([
      this.employees$,
      this.selectedPosition$
    ]).pipe(
      map(([employees, selectedPosition]) =>
        selectedPosition
          ? employees.filter(emp => emp.position === selectedPosition)
          : employees
      )
    );

    this.pagedEmployees$ = combineLatest([
      this.filteredEmployees$,
      this.currentPage$
    ]).pipe(
      map(([employees, page]) => {
        const start = (page - 1) * this.itemsPerPage;
        return employees.slice(start, start + this.itemsPerPage);
      })
    );
  }

  onPositionChange(position: string) {
    this.currentPage$.next(1);
    this.selectedPosition$.next(position);
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
  }
}
import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule,FormsModule],
})

export class EmployeesComponent implements OnInit {
  selectedPosition$ = new BehaviorSubject<string>('');
  employees$!: Observable<Employee[]>;
  positions$!: Observable<string[]>;
  filteredEmployees$!: Observable<Employee[]>;
  filtered$!: Observable<Employee[]>;

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

    
  }

  onPositionChange(position: string) {
    this.selectedPosition$.next(position);
  }
}
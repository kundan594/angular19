import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule],
})
export class EmployeesComponent implements OnInit {
  employees$!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
  }
}
import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule,FormsModule],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  positions: string[] = [];
  selectedPosition: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.positions = Array.from(new Set(data.map(emp => emp.position)));
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.selectedPosition) {
      this.filteredEmployees = this.employees.filter(emp => emp.position === this.selectedPosition);
    } else {
      this.filteredEmployees = this.employees;
    }
  }
}
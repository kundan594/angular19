import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http:HttpClient){

  }
  // private employees: Employee[] = [
  //   { id: 1, name: 'Alice Smith', position: 'Developer' },
  //   { id: 2, name: 'Bob Johnson', position: 'Designer' },
  //   { id: 3, name: 'Charlie Lee', position: 'Manager' }
  // ];

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/employees.json');
    //return of(this.employees);
  }
}
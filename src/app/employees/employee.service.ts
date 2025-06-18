import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  // ...add more fields as needed
}

export interface DummyUserResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http:HttpClient){

  }

  getEmployees(page: number, itemsPerPage: number): Observable<DummyUserResponse> {
    const skip = (page - 1) * itemsPerPage;
    // const url = `https://dummyjson.com/users?limit=${itemsPerPage}&skip=${skip}`;
    // return this.http.get<DummyUserResponse>(url);

const params = new HttpParams()
  .set('limit', itemsPerPage)
  .set('skip', skip);
return this.http.get<DummyUserResponse>('https://dummyjson.com/users', { params });
 
}
}
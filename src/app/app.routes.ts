import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ProductListComponent } from './products/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductListComponent }
];

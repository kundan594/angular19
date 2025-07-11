import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ProductListComponent } from './products/product-list.component';
import { PostListComponent } from './posts/post-list.component';
import { CommentListComponent } from './comments/comment-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'comments', component: CommentListComponent },
  {
    path: 'tasks', // <your-domain>/tasks
    component: TasksComponent,
  },
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent
  }
];

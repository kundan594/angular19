import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ProductListComponent } from './products/product-list.component';
import { PostListComponent } from './posts/post-list.component';
import { CommentListComponent } from './comments/comment-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'comments', component: CommentListComponent },
  
  //// different routes 

  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

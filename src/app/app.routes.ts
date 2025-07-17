import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ProductListComponent } from './products/product-list.component';
import { PostListComponent } from './posts/post-list.component';
import { CommentListComponent } from './comments/comment-list.component';
//import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';
import { AppComponent } from './investment/app.component';
import { AppComponent1 } from './statusApp/app.component';
import { AppComponent2 } from './lifecycle/app.component';
import { AppComponent3 } from './directives-deep-dive/app.component';
import { AppComponent4 } from './pipe-deep-dive/app.component';
import { AppComponent5 } from './serviceExample/app.component';
import { AppComponent6 } from './change-detection/app.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'invest', component: AppComponent },
  { path: 'status', component: AppComponent1 },
  { path: 'lifecycle', component: AppComponent2 },
  { path: 'directive', component: AppComponent3 },
  { path: 'pipe', component: AppComponent4 },
  { path: 'service', component: AppComponent5},
  { path: 'zone', component: AppComponent6},
  
  

  
  
  
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full'
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    loadChildren: () =>
      import('./users/users.routes').then((mod) => mod.routes),
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

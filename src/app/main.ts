import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';
import { AppComponent5 } from './serviceExample/app.component';
import { TasksService } from './serviceExample/tasks/tasks.service';

// import { AppComponent } from './app/app.component';
// import { TasksService } from './app/tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token'
);

bootstrapApplication(AppComponent5, {
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));
// bootstrapApplication(AppComponent).catch(
//   (err) => console.error(err)
// );

import { Routes } from '@angular/router';

import { TaskDetailsComponent } from './task/components/task-details/task-details.component';
import { UsersListComponent } from './user/components/users-list/users-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent,
  },
  {
    path: 'tasks/:id',
    component: TaskDetailsComponent,
  },
];

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { UserService } from '../../user/service/user.service';
import { ITask } from '../task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  userTasks = signal<ITask[]>([]);
  userAllTasks = signal<ITask[]>([]);
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private taskUrl = 'http://localhost:3000/tasks';

  private userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId =>
      this.http.get<ITask[]>(`${this.taskUrl}?userId=${userId}`).pipe(
        tap(tasks => {
          this.userTasks.set(tasks);
        }),
      ),
    ),
  );

  readonlyUserTasks = toSignal(this.userTasks$, {
    initialValue: [] as ITask[],
  });

  private userAllTasks$ = this.http.get<ITask[]>(`${this.taskUrl}`).pipe(
    tap(tasks => {
      this.userAllTasks.set(tasks);
    }),
  );

  readonlyUserAllTasks = toSignal(this.userAllTasks$, {
    initialValue: [] as ITask[],
  });
}

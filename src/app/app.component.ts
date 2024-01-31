import { Component, effect, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TaskService } from './task/service/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly taskService = inject(TaskService);

  constructor() {
    effect(() => {
      localStorage.setItem(
        'TASKS',
        JSON.stringify(this.taskService.userAllTasks()),
      );
    });
  }
}

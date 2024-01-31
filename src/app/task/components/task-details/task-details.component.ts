import {
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  TitleCasePipe,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { UserService } from '../../../user/service/user.service';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../task.interface';

const MATERIAL = [
  MatRowDef,
  MatTable,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatDivider,
  MatButton,
  MatCell,
  MatCellDef,
  MatIcon,
];

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    RouterLink,
    MATERIAL,
    MatIconButton,
    MatTooltip,
    MatFabButton,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  @Input() id!: number | string;
  // ANGULAR
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly http = inject(HttpClient);
  protected readonly destroyRef = inject(DestroyRef);
  // VAR LOCAL
  protected displayedColumns = ['id', 'name', 'description', 'completed'];
  protected fullColumns = [...this.displayedColumns, 'status', 'delete'];
  protected selectedUserId!: number;
  private tasksUrl = 'http://localhost:3000/tasks';
  // SERVICES
  private userService = inject(UserService);
  private taskService = inject(TaskService);
  //SIGNALS
  protected userTasks = this.taskService.userTasks;
  protected userAllTasks = this.taskService.userAllTasks;

  ngOnInit() {
    // this.selectedUserId = this.route.snapshot.params['id'];
    if (this.id) {
      this.userService.setSelectedUserId(this.id);
    } else {
      this.router.navigate(['/']).then();
    }

    // if (this.selectedUserId) {
    //   this.userService.setSelectedUserId(this.selectedUserId);
    // } else {
    //   this.router.navigate(['/']).then();
    // }
  }

  addNewTask() {
    const newTask: ITask = {
      name: 'Aprender Angular Signals',
      description: 'Desvendar os mistérios do Angula Signals',
      userId: this.selectedUserId,
      completed: false,
    };

    this.http
      .post<ITask>(this.tasksUrl, newTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resTask => {
          // Atualiza o signal com as Tasks de um usuário
          this.userTasks.update(tasks => [...tasks, resTask]);
          // Atualiza o signal com todas as Tasks
          this.userAllTasks.update(tasks => [...tasks, resTask]);
        },
      });
  }

  updateTask(task: ITask): void {
    const completedTask: ITask = {
      ...task,
      completed: true,
    };

    this.http
      .put<ITask>(`${this.tasksUrl}/${task.id}`, completedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskService.userTasks.update(tasks =>
            tasks.filter(resTask =>
              resTask.id === task.id ? (resTask.completed = true) : task,
            ),
          );
        },
      });
  }

  deleteTask(id: string | number): void {
    this.http
      .delete<ITask[]>(`${this.tasksUrl}/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // Atualiza o signal com as Tasks de um usuário
        this.taskService.userTasks.update(tasks =>
          tasks.filter(task => task.id !== id),
        );
        // Atualiza o signal com todas as Tasks
        this.taskService.userAllTasks.update(tasks =>
          tasks.filter(task => task.id !== id),
        );
      });
  }
}

import {
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  TitleCasePipe,
} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
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
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  protected selectedUserId!: number;
  protected userService = inject(UserService);
  protected taskService = inject(TaskService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  protected displayedColumns = ['id', 'name', 'description', 'completed'];
  protected fullColumns = [...this.displayedColumns, 'status'];
  protected userTasks = this.taskService.userTasks;

  ngOnInit() {
    this.selectedUserId = this.route.snapshot.params['id'];

    if (this.selectedUserId) {
      this.userService.setSelectedUserId(this.selectedUserId);
    } else {
      this.router.navigate(['/']).then();
    }
  }
}

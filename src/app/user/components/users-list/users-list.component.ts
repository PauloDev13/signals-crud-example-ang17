import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
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

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgIf,
    MatTable,
    MatColumnDef,
    NgForOf,
    MatHeaderCell,
    MatHeaderCellDef,
    TitleCasePipe,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  protected displayedColumns = ['id', 'name', 'email', 'gender'];
  protected fullColumns = ['id', 'name', 'email', 'gender', 'action'];
  private userService = inject(UserService);
  protected users = this.userService.users;
}

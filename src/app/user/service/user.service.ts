import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IUser } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  userUrl = 'http://localhost:3000/users';
  selectedUserId = signal<number | string>(0);
  totalUsersCount = computed(() => this.users().length);
  private users$ = this.http.get<IUser[]>(this.userUrl);
  users = toSignal(this.users$, { initialValue: [] as IUser[] });

  setSelectedUserId(id: number | string): void {
    this.selectedUserId.set(id);
  }
}

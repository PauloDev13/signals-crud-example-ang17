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
  selectedUserId = signal(0);
  private users$ = this.http.get<IUser[]>(this.userUrl);
  users = toSignal(this.users$, { initialValue: [] as IUser[] });
  totalUsersCount = computed(() => this.users().length);

  setSelectedUserId(id: number): void {
    this.selectedUserId.set(id);
  }
}

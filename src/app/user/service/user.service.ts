import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IUser } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  userUrl = 'http://localhost:3000/users';
  private users$ = this.http.get<IUser[]>(this.userUrl);
  users = toSignal(this.users$, { initialValue: [] as IUser[] });
}

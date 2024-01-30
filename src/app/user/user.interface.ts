import { ITask } from '../task/task.interface';

export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: 'M' | 'F';
  tasks: ITask[];
}

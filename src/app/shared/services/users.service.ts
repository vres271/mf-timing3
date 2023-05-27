import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { UsersMockData } from './users.mock';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private items: User[] = [];
  private items$ = new BehaviorSubject<User[]>([]);

  constructor() {
    this.generateUsers();
  }

  getUsers():Observable<User[]> {
    return this.items$;
  }

  generateUsers() {
    this.items = UsersMockData;
    this.items$.next(this.items);
  }

}

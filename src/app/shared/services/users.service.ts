import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { UsersMockData } from './users.mock';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private items$ = new BehaviorSubject<User[]>([]);

  constructor(private dataService: DataService) {
  }

  getUsers():Observable<User[]> {
    return this.items$;
  }

  generateUsers() {
    this.dataService.items.users = UsersMockData.map(item => new User(item));
    this.dataService.createMap('users');
    this.items$.next(this.dataService.items.users);
  }


}

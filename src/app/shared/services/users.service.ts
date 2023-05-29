import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { UsersMockData } from '../mocks/users.mock';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';

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
    this.dataService.items[EntityType.User] = UsersMockData.map(item => new User(item));
    this.dataService.createMap(EntityType.User);
    this.items$.next(this.dataService.items[EntityType.User]);
  }


}

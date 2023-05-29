import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserDTO } from './../models/user.model';
import { Injectable } from '@angular/core';
import { UsersMockData } from '../mocks/users.mock';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private items$ = new BehaviorSubject<User[]>([]);

  constructor(
    private dataService: DataService,
    private dbService: NgxIndexedDBService,
  ) {
  }

  getUsers():Observable<User[]> {
    return this.items$;
  }

  generateUsers() {
    // this.dataService.items[EntityType.User] = UsersMockData.map(item => new User(item));
    this.dbService.getAll(EntityType.User).subscribe((result) => {
      this.dataService.items[EntityType.User] = result.map(item =>  new User(item as UserDTO));
      this.dataService.createMap(EntityType.User);
      this.items$.next(this.dataService.items[EntityType.User]);
    });
  }


}

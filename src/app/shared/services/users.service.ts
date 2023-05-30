import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserDTO } from './../models/user.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { APIService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private items$ = new BehaviorSubject<User[]>([]);

  constructor(
    private dataService: DataService,
    private apiService: APIService,
  ) {
  }

  getUsers():Observable<User[]> {
    return this.items$;
  }

  generateUsers() {
    this.apiService.get<UserDTO>(EntityType.User)
      .subscribe((result) => {
        this.dataService.items[EntityType.User] = result
          .map((item) =>  new User(item as UserDTO));
        this.dataService.createMap(EntityType.User);
        this.items$.next(this.dataService.items[EntityType.User]);
      });
  }


}

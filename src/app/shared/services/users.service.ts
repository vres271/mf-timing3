import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserDTO } from './../models/user.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { APIService } from 'src/app/core/services/api.service';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService extends ItemsService<User, UserDTO>{

  override itemClass = User;
  override entityType = EntityType.User;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
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

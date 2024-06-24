import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserDTO } from './../models/user.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { APIService } from '../../core/services/api.service';
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

}

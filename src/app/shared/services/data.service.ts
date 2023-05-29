import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Racer } from '../models/racer.model';
import { EntityType } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  map: Record<EntityType, {id: Map<number, Racer | User>}> = {
    [EntityType.User]: {id: new Map()},
    [EntityType.Racer]: {id: new Map()},
  };

  items: Record<EntityType, any[]> =  {
    [EntityType.User]: [],
    [EntityType.Racer]: [],
  };
  
  constructor() { }

  createMap(key: EntityType) {
    this.items[key].forEach((item: any) => {
      this.map[key].id.set(item.id, item)
    });
  }

  getById(key: EntityType, id: number) {
    return this.map[key].id.get(id);
  }

}

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Racer } from '../models/racer.model';
import { EntityType, Item } from '../models/items.model';

export interface ItemsMapSection {
  id: Map<number, Racer | User>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  map: Record<string, ItemsMapSection> = {
    [EntityType.User]: {id: new Map()},
    [EntityType.Racer]: {id: new Map()},
    [EntityType.Race]: {id: new Map()},
    [EntityType.LogItem]: {id: new Map()},
    [EntityType.RaceEvent]: {id: new Map()},
  };

  items: Record<string, any[]> =  {
    [EntityType.User]: [],
    [EntityType.Racer]: [],
    [EntityType.Race]: [],
    [EntityType.LogItem]: [],
    [EntityType.RaceEvent]: [],
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

  addItem(entityType: EntityType, newItem: any) {
    this.items[entityType].push(newItem);
    this.createMap(entityType);
  }

  replaceItems(entityType: EntityType, newItems: any) {
    newItems.forEach((newItem: any) => {
      const i = this.items[entityType].findIndex((item: Item) => item.id === newItem.id);
      this.items[entityType][i] = newItem;
    })
    this.createMap(entityType);
  }

  replaceItem(entityType: EntityType, newItem: any) {
    const i = this.items[entityType].findIndex((item: Item) => item.id === newItem.id);
    this.items[entityType][i] = newItem;
    this.createMap(entityType);
  }

  deleteItem(entityType: EntityType, id: number) {
    const i = this.items[entityType].findIndex((item:any) => item.id === id);
    this.items[entityType].splice(i, 1);
    this.createMap(entityType);
  }

  afterItemUpdate<T, V>(key: EntityType, savedDTO: any, type: { new(a:T, b:Record<EntityType, ItemsMapSection>):V ;}):T {
    const i = this.items[key].findIndex((item:any) => item.id === savedDTO.id);
    this.items[key][i] = new type(savedDTO, this.map);
    this.createMap(EntityType.Racer);
    return savedDTO;
  }

}

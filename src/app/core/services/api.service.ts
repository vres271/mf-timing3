import { Injectable } from '@angular/core';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { EntityType } from 'src/app/shared/models/items.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private dbService: NgxIndexedDBService) { }

  get<T>(entityType: EntityType):Observable<T[]> {
    return this.dbService.getAll(entityType);
  }

  getById<T>(entityType: EntityType, id: number):Observable<T> {
    return this.dbService.getByKey(entityType, id);
  }

  add<T>(entityType: EntityType, item: T):Observable<T> {
    return this.dbService.add(entityType, item);
  }

  update<T>(entityType: EntityType, item: T):Observable<T> {
    return this.dbService.update(entityType, item);
  }

  bulkDelete(entityType: EntityType, ids: number[]):Observable<number[]> {
    return this.dbService.bulkDelete(entityType, ids);
  }

}

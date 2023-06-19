import { Injectable } from '@angular/core';
import { Key, NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, forkJoin, tap } from 'rxjs';
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
    const _item = item as any;
    delete _item.id;
    return this.dbService.add(entityType, _item);
  }

  update<T>(entityType: EntityType, dtos: T[]):Observable<T[]> {
    return forkJoin(dtos.map(dto => this.dbService.update(entityType, dto)))
    // return this.dbService.update(entityType, item);
  }

  delete(entityType: EntityType, id: number):Observable<any> {
    return this.dbService.delete(entityType, id);
  }

}

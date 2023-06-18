import { APIService } from '../../core/services/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';

export type Class = { new(...args: any[]): any; };

export abstract class ItemsService<ItemType, DTOType> {

  items$ = new BehaviorSubject<ItemType[]>([]);
  itemClass: Class;
  entityType: EntityType;

  constructor(
    public dataService: DataService,
    public apiService: APIService,
  ) { }

  get():Observable<ItemType[]> {
    return this.items$;
  }

  load():Observable<DTOType[]> {
    return this.apiService.get<DTOType>(this.entityType)
      .pipe(tap((dtos: DTOType[] ) => {
        this.dataService.items[this.entityType] = dtos
          .map((dto) => new (this.itemClass)(dto as DTOType, this.dataService.map));
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      }));
  }


  add(dto: DTOType):Observable<DTOType> {
    return this.apiService.add<DTOType>(this.entityType, dto)
      .pipe(tap((addedDTO: any ) => {
        const newItem = new (this.itemClass)(addedDTO, this.dataService.map);
        this.dataService.items[this.entityType].push(newItem);
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      }));  
  }

  save(dto: DTOType):Observable<DTOType> {
    return this.apiService.update<DTOType>(this.entityType, dto)
      .pipe(tap((savedDTO: any ) => {
        const i = this.dataService.items[this.entityType].findIndex((item:any) => item.id === savedDTO.id);
        const newItem = new (this.itemClass)(savedDTO, this.dataService.map);
        this.dataService.items[this.entityType][i] = newItem;
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      }));
  }

  delete(id: number):Observable<DTOType> {
    return this.apiService.delete(this.entityType, id)
      .pipe(tap((deletedDTO: DTOType ) => {
        const i = this.dataService.items[this.entityType].findIndex((item:any) => item.id === id);
        this.dataService.items[this.entityType].splice(i, 1);
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      }));
  }

}
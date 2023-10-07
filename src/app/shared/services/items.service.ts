import { APIService } from '../../core/services/api.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataService } from './data.service';
import { EntityType, Item, ItemDTO } from '../models/items.model';

export type Class = { new(...args: any[]): any; };

export abstract class ItemsService<ItemType extends Item, DTOType extends ItemDTO> {

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

  getCachedById(id: number):ItemType {
    return this.dataService.items[this.entityType].find(racer => racer.id === id);
  }

  getAsDictionary(label = 'name'): Observable<{value: ItemType, label: string}[]> {
    return this.get()
      .pipe(
        map(items => items
          .map(item => ({value: item, label: (item as any)[label]}))
        )
      )
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

  add1(items: ItemType[]):Observable<ItemType> {
    return this.apiService.add<DTOType>(this.entityType, (items[0] as any).toDTO())
      .pipe(
        map(addedDTO => {
          const newItem = new (this.itemClass)(addedDTO, this.dataService.map);
          this.dataService.addItem(this.entityType, newItem);
          this.items$.next(this.dataService.items[this.entityType]);
          return newItem;
        })
      );  
  }

  save1(items: ItemType[]):Observable<ItemType[]> {
    return this.apiService.update<DTOType>(this.entityType, items.map((item:any) => item.toDTO()))
      .pipe(
        map(savedDTOs => {
          const newItems = savedDTOs.map((savedDTO: DTOType) =>  new (this.itemClass)(savedDTO, this.dataService.map));
          this.dataService.replaceItems(this.entityType, newItems);
          this.items$.next(this.dataService.items[this.entityType]);
          return newItems;
        })
      );
  }

  save(dtos: DTOType[]):Observable<DTOType[]> {
    return this.apiService.update<DTOType>(this.entityType, dtos)
      .pipe(tap((savedDTOs: DTOType[] ) => {
          savedDTOs.forEach((savedDTO:any) => {
            const i = this.dataService.items[this.entityType].findIndex((item:any) => item.id === savedDTO.id);
            const newItem = new (this.itemClass)(savedDTO, this.dataService.map);
            this.dataService.items[this.entityType][i] = newItem;
          })
          this.dataService.createMap(this.entityType);
          this.items$.next(this.dataService.items[this.entityType]);
      }));
  }

  delete(id: number):Observable<DTOType> {
    return this.apiService.delete(this.entityType, id)
      .pipe(tap((deletedDTO: DTOType ) => {
        this.dataService.deleteItem(this.entityType, id);
        this.items$.next(this.dataService.items[this.entityType]);
      }));
  }

}
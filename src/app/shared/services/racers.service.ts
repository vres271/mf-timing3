import { APIService } from '../../core/services/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Racer, Racer2DTO, RacerDTO } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';


export abstract class ItemsService<ItemType, DTOType> {

  items$ = new BehaviorSubject<ItemType[]>([]);

  constructor(
    public dataService: DataService,
    public apiService: APIService,
  ) { }

  get():Observable<ItemType[]> {
    return this.items$;
  }  

  add(dto: DTOType):Observable<DTOType> {
    return this.apiService.add<DTOType>(EntityType.Racer, dto)
      .pipe(tap((addedRacerDTO: any ) => {
        this.dataService.items[EntityType.Racer].push(new Racer(addedRacerDTO, this.dataService.map));
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      }));  
  }

  save(dto: DTOType):Observable<any> {
    return this.apiService.update<DTOType>(EntityType.Racer, dto)
      .pipe(tap((savedRacerDTO: any ) => {
        const i = this.dataService.items[EntityType.Racer].findIndex((item:any) => item.id === savedRacerDTO.id);
        this.dataService.items[EntityType.Racer][i] = new Racer(savedRacerDTO, this.dataService.map);
        this.dataService.createMap(EntityType.Racer);
            this.items$.next(this.dataService.items[EntityType.Racer]);
      }));
  }


}

@Injectable({
  providedIn: 'root'
})

export class RacersService extends ItemsService<Racer, RacerDTO>{

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

  addRacer(dto: RacerDTO):Observable<any> {
    return this.apiService.add<RacerDTO>(EntityType.Racer, dto)
      .pipe(tap(addedRacerDTO => {
        this.dataService.items[EntityType.Racer].push(new Racer(addedRacerDTO, this.dataService.map));
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      }));
  }

  saveRacer(dto: RacerDTO):Observable<any> {
    return this.apiService.update<RacerDTO>(EntityType.Racer, dto)
      .pipe(tap(savedRacerDTO => {
        this.dataService.afterItemUpdate<RacerDTO, Racer>(EntityType.Racer, savedRacerDTO, Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      }));
  }

  generateRacers() {
    this.apiService.get<RacerDTO>(EntityType.Racer)
      .subscribe((result) => {
        this.dataService.items[EntityType.Racer] = result
          .map((dto) => new Racer(dto as RacerDTO, this.dataService.map));
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      });
  }


}

import { APIService } from '../../core/services/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Racer, Racer2DTO, RacerDTO } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})

export class RacersService {
  private items$ = new BehaviorSubject<Racer[]>([]);

  constructor(
    private dataService: DataService,
    private apiService: APIService,
  ) {
  }

  getRacers():Observable<Racer[]> {
    return this.items$;
  }

  addRacer(item: RacerDTO):Observable<any> {
    return this.apiService.add<RacerDTO>(EntityType.Racer, item)
      .pipe(tap(addedRacerDTO => {
        this.dataService.items[EntityType.Racer].push(new Racer(addedRacerDTO, this.dataService.map.users));
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      }));
  }

  saveRacer(item: RacerDTO):Observable<any> {
    return this.apiService.update<RacerDTO>(EntityType.Racer, item)
      .pipe(tap(savedRacerDTO => {
        const i = this.dataService.items[EntityType.Racer].findIndex((racer:Racer) => racer.id === savedRacerDTO.id);
        this.dataService.items[EntityType.Racer][i] = new Racer(savedRacerDTO, this.dataService.map.users);
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      }));
  }

  generateRacers() {
    this.apiService.get<RacerDTO>(EntityType.Racer)
      .subscribe((result) => {
        this.dataService.items[EntityType.Racer] = result
          .map((item) => new Racer(item as RacerDTO, this.dataService.map.users));
        this.dataService.createMap(EntityType.Racer);
        this.items$.next(this.dataService.items[EntityType.Racer]);
      });
  }


}

import { BehaviorSubject, Observable } from 'rxjs';
import { Racer, RacerDTO } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { RacersMockData } from '../mocks/racers.mock';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})

export class RacersService {
  private items$ = new BehaviorSubject<Racer[]>([]);

  constructor(
    private dataService: DataService,
    private dbService: NgxIndexedDBService,
  ) {
  }

  getRacers():Observable<Racer[]> {
    return this.items$;
  }

  generateRacers() {
    // this.dataService.items[EntityType.Racer] = RacersMockData.map(item => new Racer(item, this.dataService.map.users));
    this.dbService.getAll(EntityType.Racer).subscribe((result) => {
      this.dataService.items[EntityType.Racer] = result.map((item) => new Racer(item as RacerDTO, this.dataService.map.users));
      this.dataService.createMap(EntityType.Racer);
      this.items$.next(this.dataService.items[EntityType.Racer]);
    });
  }


}

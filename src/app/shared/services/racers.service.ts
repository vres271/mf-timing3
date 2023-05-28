import { BehaviorSubject, Observable } from 'rxjs';
import { Racer } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { RacersMockData } from './racers.mock';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class RacersService {
  private items$ = new BehaviorSubject<Racer[]>([]);

  constructor(private dataService: DataService) {
  }

  getRacers():Observable<Racer[]> {
    return this.items$;
  }

  generateRacers() {
    this.dataService.items.racers = RacersMockData.map(item => new Racer(item, this.dataService.map.users));
    this.dataService.createMap('racers');
    this.items$.next(this.dataService.items.racers);
  }


}

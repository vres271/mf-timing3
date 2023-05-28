import { BehaviorSubject, Observable } from 'rxjs';
import { Racer } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { RacersMockData } from '../mocks/racers.mock';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class RacersService {
  private items: Racer[];
  private items$ = new BehaviorSubject<Racer[]>([]);

  constructor(private dataService: DataService) {
    this.items = this.dataService.items.racers
  }

  getRacers():Observable<Racer[]> {
    return this.items$;
  }

  generateRacers() {
    this.items = RacersMockData.map(item => new Racer(item, this.dataService.map.users));
    this.dataService.createMap('racers');
    this.items$.next(this.items);
  }


}

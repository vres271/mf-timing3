import { APIService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Racer, RacerDTO } from './../models/racer.model';
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

  saveRacer(item: Racer):Observable<any> {
    const dto:RacerDTO = {
      id: 1*item.id,
      userId: 1*item.userId,
      raceId: 1*item.raceId ,
      categoryId: 1*item.categoryId,
      regDate: item.regDate.getTime(),
      num: 1*item.num,
    }
    return this.apiService.update<RacerDTO>(EntityType.Racer, dto);
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

import { APIService } from '../../core/services/api.service';
import { Racer, Racer2DTO, RacerDTO } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})

export class RacersService extends ItemsService<Racer, RacerDTO>{

  override itemClass = Racer;
  override entityType = EntityType.Racer;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

  generateRacers() {
    this.apiService.get<RacerDTO>(this.entityType)
      .subscribe((result) => {
        this.dataService.items[this.entityType] = result
          .map((dto) => new (this.itemClass)(dto as RacerDTO, this.dataService.map));
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      });
  }

  item2DTO(item: Racer) {
    return Racer2DTO(item);
  }

}

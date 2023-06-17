import { APIService } from '../../core/services/api.service';
import { Race, RaceDTO } from './../models/race.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { ItemsService } from './items.service';

@Injectable()

export class RacesService extends ItemsService<Race, RaceDTO>{

  override itemClass = Race;
  override entityType = EntityType.Race;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

  generateRaces() {
    this.apiService.get<RaceDTO>(this.entityType)
      .subscribe((result) => {
        this.dataService.items[this.entityType] = result
          .map((dto) => new (this.itemClass)(dto as RaceDTO, this.dataService.map));
        this.dataService.createMap(this.entityType);
        this.items$.next(this.dataService.items[this.entityType]);
      });
  }

}

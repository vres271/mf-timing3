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

}

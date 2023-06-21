import { APIService } from '../../core/services/api.service';
import { RaceEvent, RaceEventDTO } from './../models/race-event.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { ItemsService } from './items.service';

@Injectable()

export class RaceEventsService extends ItemsService<RaceEvent, RaceEventDTO>{

  override itemClass = RaceEvent;
  override entityType = EntityType.RaceEvent;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

}

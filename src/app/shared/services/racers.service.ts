import { APIService } from '../../core/services/api.service';
import { Racer, Racer2DTO, RacerDTO } from './../models/racer.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { ItemsService } from './items.service';

@Injectable()

export class RacersService extends ItemsService<Racer, RacerDTO>{

  override itemClass = Racer;
  override entityType = EntityType.Racer;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

}

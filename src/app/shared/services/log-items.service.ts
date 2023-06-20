import { APIService } from '../../core/services/api.service';
import { LogItem, LogItemDTO } from './../models/log-item.model';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityType } from '../models/items.model';
import { ItemsService } from './items.service';

@Injectable()

export class LogItemsService extends ItemsService<LogItem, LogItemDTO>{

  override itemClass = LogItem;
  override entityType = EntityType.LogItem;

  constructor(
    dataService: DataService,
    apiService: APIService,
  ) {
    super(dataService, apiService)
  }

}

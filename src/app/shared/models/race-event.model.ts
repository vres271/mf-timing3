import { Item } from './items.model.js';
import { Race } from './race.model.js';
import { Racer } from './racer.model.js';

export enum RaceEventType{
  Start = 1,
  Point,
  Finish,
}

export const RaceEventTypeNames: Record<RaceEventType, string> = {
  [RaceEventType.Start]: 'Start',
  [RaceEventType.Point]: 'Point',
  [RaceEventType.Finish]: 'Finish',
}

export interface RaceEventDTO extends Item{
  id: number;
  date: number;
  dt: number;
  raceEventType: RaceEventType;
  raceId: number;
  racerId: number;
  detail: any;
}

export class RaceEvent  implements RaceEventDTO{
  id: number;
  date: number;
  dt: number;
  raceId: number;
  racerId: number;
  raceEventType: RaceEventType;
  detail: any;

  private itemsMap: any;
  
  constructor(dto: RaceEventDTO, itemsMap: any) {
    Object.assign(this, dto);
    this.itemsMap = itemsMap;
  }
  
  get dateString():string {
    return new Date(this.date).toLocaleString();
  }

  get dtString():string {
    return new Date(this.dt).toISOString().substring(11,23)
  }

  get raceEventTypeName():string {
    return RaceEventTypeNames[this.raceEventType];
  }

  get racer():Racer {
    return this.itemsMap.racers.id.get(this.racerId);
  }
  
  get racerName():string {
    return this.racer?.userName;
  }

  get racerFullName():string {
    return this.racer?.userFullName
  }

  get racerNum():number {
    return this.racer?.num
  }

  get race():Race {
    return this.itemsMap.races.id.get(this.raceId);
  }
  
  get raceName():string {
    return this.race?.name;
  }

}

export function DTO2RaceEvent() {

}

export function RaceEvent2DTO(item: RaceEvent):RaceEventDTO {
  const dto:RaceEventDTO = {
    id: 1*item.id || 0,
    date: ((date:any) => typeof date === 'object' ? date.getTime() : date)(item.date),
    dt: 1*item.id || 0,
    raceEventType: 1*item.raceEventType || 0,
    raceId: item.raceId || 0,
    racerId: item.racerId || 0,
    detail: item.detail || null,
  }
  return dto;
}
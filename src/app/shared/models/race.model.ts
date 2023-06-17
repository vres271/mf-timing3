import { Item } from './items.model.js';
export enum RaceType{
  Standart = 1,
  PumpBattle
}

export interface RaceDTO extends Item{
  id: number;
  name: string;
  startDate: number;
  raceType: RaceType;
}

export class Race  implements RaceDTO{
  id: number;
  name: string;
  startDate: number;
  raceType: RaceType;

  constructor(dto: RaceDTO, itemsMap: any) {
    Object.assign(this, dto);
  }
  
  get startDateString():string {
    return new Date(this.startDate).toLocaleString();
  }

}

export function DTO2Race() {

}

export function Race2DTO(item: Race):RaceDTO {
  const dto:RaceDTO = {
    id: 1*item.id || 0,
    name: item.name || '',
    startDate: item.startDate,
    raceType: 1*item.raceType || 0,
  }
  return dto;
}

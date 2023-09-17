import { Item } from './items.model.js';
import { Race } from './race.model.js';
import { User } from './user.model.js';

export interface EmptyRacer extends Partial<Racer>{
  
}

export interface RacerDTO extends Item{
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: number;
    num: number;
}
// test
export class Racer  implements RacerDTO{
    id: number;
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: number;
    num: number;

    private itemsMap: any;
  
    constructor(dto: RacerDTO, itemsMap: any) {
      Object.assign(this, dto);
      this.itemsMap = itemsMap;
    }
  
    get user():User {
      return this.itemsMap.users.id.get(this.userId);
    }
    
    get userName():string {
      return this.user?.name;
    }

    get userFullName():string {
      return this.user?.fullName
    }

    get registrationDate():string {
      return new Date(this.regDate).toLocaleString();
    }

    get race():Race {
      return this.itemsMap.races.id.get(this.raceId);
    }

    get raceName():string {
      return this.race?.name;
    }
    
    get raceTypeName():string {
      return this.race?.raceTypeName;
    }
    
}

export function DTO2Racer() {

}

export function Racer2DTO(item: Racer):RacerDTO {
    const dto:RacerDTO = {
      id: 1*item.id || 0,
      userId: 1*item.userId || 0,
      raceId: 1*item.raceId || 0 ,
      categoryId: 1*item.categoryId || 0,
      regDate: ((regDate:any) => typeof regDate === 'object' ? regDate.getTime() : regDate)(item.regDate),
      num: 1*item.num || 0,
    }
    return dto;
}

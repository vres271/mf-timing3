import { Item } from './items.model.js';
import { User } from './user.model.js';


export interface RacerDTO extends Item{
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: number;
    num: number;
}

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

}

export function DTO2Racer() {

}

export function Racer2DTO(item: Racer):RacerDTO {
    const dto:RacerDTO = {
      id: 1*item.id,
      userId: 1*item.userId,
      raceId: 1*item.raceId ,
      categoryId: 1*item.categoryId,
      regDate: item.regDate,
      num: 1*item.num,
    }
    return dto;
}

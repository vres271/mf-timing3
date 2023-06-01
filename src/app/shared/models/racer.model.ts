import { Item } from './items.model.js';
import { User } from './user.model.js';


export interface RacerDTO extends Item{
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: number;
    num: number;
}

export class Racer{
    id: number;
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: Date;
    num: number;

    private itemsMap: any;
  
    constructor(dto: RacerDTO, itemsMap: any) {
      Object.assign(this, dto);
      this.regDate = new Date(dto.regDate);
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

    get formatedDate():string {
      return new Date(this.regDate).toISOString().slice(0, 10);
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
      regDate: item.regDate.getTime(),
      num: 1*item.num,
    }
    return dto;
}

import { Item } from './items.model.js';
import { User } from './user.model.js';


export interface RacerDTO extends Item{
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: Date;
}

export class Racer{
    id: number;
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: Date;

    private usersMap: any;
  
    constructor(dto: RacerDTO, usersMap: any) {
        Object.assign(this, dto);
        this.usersMap = usersMap;
    }
  
    get user():User {
      return this.usersMap.id[this.userId];
    }
    
    get userName():string {
      return this.usersMap.id[this.userId]?.name;
    }

    get userFullName():string {
      return [
        this.usersMap.id[this.userId]?.firstName,
        this.usersMap.id[this.userId]?.secondName,
        this.usersMap.id[this.userId]?.thirdName,
      ].join(' ').trim();
    }

}

export function DTO2Racer() {

}

export function Racer2DTO(item: Racer):RacerDTO {
    const dto = <RacerDTO>{};
    dto.userId = item.userId;
    dto.raceId = item.raceId;
    dto.categoryId = item.categoryId;
    dto.regDate = item.regDate;
    return dto;
}

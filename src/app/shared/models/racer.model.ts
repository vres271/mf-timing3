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

    private usersMap: any;
  
    constructor(dto: RacerDTO, usersMap: any) {
      Object.assign(this, dto);
      this.regDate = new Date(dto.regDate);
      this.usersMap = usersMap;
    }
  
    get user():User {
      return this.usersMap.id.get(this.userId);
    }
    
    get userName():string {
      return this.user?.name;
    }

    get userFullName():string {
      return [
        this.user?.firstName,
        this.user?.secondName,
        this.user?.thirdName,
      ].join(' ').trim();
    }

    get formatedDate():string {
      return new Date(this.regDate).toISOString().slice(0, 10);
    }

}

export function DTO2Racer() {

}

export function Racer2DTO(item: Racer):RacerDTO {
    const dto = <RacerDTO>{};
    dto.userId = item.userId;
    dto.raceId = item.raceId;
    dto.categoryId = item.categoryId;
    // dto.regDate = new Date(item.regDate);
    return dto;
}

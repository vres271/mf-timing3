import { Item, ItemDTO } from './items.model.js';
import { Race } from './race.model.js';
import { User } from './user.model.js';

export interface EmptyRacer extends Partial<Racer> {
  
}

export interface RacerDTO extends ItemDTO {
    userId: number;
    raceId: number;
    categoryId: number;
    regDate: number;
    num: number;
}

export class Racer implements Item {
    id: number;
    private _userId: number;
    private _raceId: number;
    private _categoryId: number;
    private _regDate: Date;
    num: number;

    private itemsMap: any;
  
    constructor(dto: RacerDTO, itemsMap: any) {
      // Object.assign(this, dto);
      this.fromDTO(dto);
      this.itemsMap = itemsMap;
    }
  
    fromDTO(dto: RacerDTO) {
      this.id = dto.id
      this._userId = dto.userId;
      this._raceId = dto.raceId;
      this._categoryId = dto.categoryId;
      this._regDate = dto.regDate ? new Date(dto.regDate) : new Date();
      this.num = dto.num;
    }

    toDTO(): RacerDTO {
      const dto:RacerDTO = {
        id: this.id,
        userId: this.user?.id,
        raceId: this.race?.id,
        categoryId: this.category?.id,
        regDate: this._regDate.getTime(),
        num: this.num,
      }
      return dto;
    }

    clone(): Racer {
      return new Racer(this.toDTO(), this.itemsMap);
    }

    get user():User {
      return this.itemsMap.users.id.get(this._userId);
    }

    set user(value: User) {
      this._userId = value.id;
    }
    
    get userName():string {
      return this.user?.name;
    }

    get userFullName():string {
      return this.user?.fullName
    }

    get regDate():Date {
      return this._regDate;
    }

    set regDate(date: Date) {
      this._regDate = date;
    }

    get registrationDate():string {
      return this.regDate.toLocaleString();
    }

    get race():Race {
      return this.itemsMap.races.id.get(this._raceId);
    }
    
    set race(value: Race) {
      this._raceId = value.id;
    }

    get raceName():string {
      return this.race?.name;
    }
    
    get raceTypeName():string {
      return this.race?.raceTypeName;
    }

    get category():any {
      return null;
    }
    
    set category(value: any) {
      this._categoryId = value.id;
    }
    
}

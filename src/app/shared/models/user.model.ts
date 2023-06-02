import { Item } from './items.model.js';

export interface UserDTO extends Item{
    name: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    email: string;
    active: boolean;
}

export class User implements UserDTO{
    id: number;
    name: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    email: string;
    active: boolean;
    get fullName():string {
        return [
            this.firstName,
            this.secondName,
            this.thirdName,
        ].join(' ').trim();
    }
  
  
    constructor(dto: UserDTO) {
        Object.assign(this, dto);
    }
    
}

export function User2DTO(item: User):UserDTO {
    const dto:UserDTO = {
      id: 1*item.id,
      name: item.name,
      firstName: item.firstName,
      secondName: item.secondName,
      thirdName: item.thirdName,
      email: item.email,
      active: item.active,
    }
    return dto;
}

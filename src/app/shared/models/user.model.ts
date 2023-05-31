import { Item } from './items.model.js';

export interface UserDTO extends Item{
    name: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    email: string;
    active: boolean;
}

export class User{
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
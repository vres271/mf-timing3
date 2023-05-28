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

  
    constructor(dto: UserDTO) {
        Object.assign(this, dto);
    }

}
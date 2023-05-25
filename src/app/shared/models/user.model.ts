import { Item } from './items.model.js';

export interface User extends Item{
    id: number;
    name: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    email: string;
    active: boolean;
}
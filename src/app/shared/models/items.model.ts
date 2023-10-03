export enum EntityType {
    User = 'users',
    Racer = 'racers',
    Race = 'races',
    LogItem = 'log',
    RaceEvent = 'race_events',
    Config = 'config',
}  

export interface Item {
    id: number;
}

export interface ItemDTO {
    id: number;
}
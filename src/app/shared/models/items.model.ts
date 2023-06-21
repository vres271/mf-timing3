export enum EntityType {
    User = 'users',
    Racer = 'racers',
    Race = 'races',
    LogItem = 'log',
    RaceEvent = 'race_events',
}  

export interface Item {
    id: number;
}
import { DBConfig } from "ngx-indexed-db";
import { migrationFactory } from './db.migration';

export function getDBConfig(options: {version: number}): DBConfig {
    return {
    name: 'MFTiming3',
    version: options.version,
    objectStoresMeta: [
      {
        store: 'users',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'firstName', keypath: 'firstName', options: { unique: false } },
          { name: 'secondName', keypath: 'secondName', options: { unique: false } },
          { name: 'thirdName', keypath: 'thirdName', options: { unique: false } },
          { name: 'email', keypath: 'email', options: { unique: false } },
          { name: 'active', keypath: 'active', options: { unique: false } },
        ]
      },
      {
        store: 'racers',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'userId', keypath: 'userId', options: { unique: false } },
          { name: 'raceId', keypath: 'raceId', options: { unique: false } },
          { name: 'categoryId', keypath: 'categoryId', options: { unique: false } },
          { name: 'regDate', keypath: 'regDate', options: { unique: false } },
          { name: 'num', keypath: 'num', options: { unique: false } },
        ]
      },
      {
        store: 'races',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'startDate', keypath: 'startDate', options: { unique: false } },
          { name: 'raceType', keypath: 'raceType', options: { unique: false } },
        ]
      },
      {
        store: 'log',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'date', keypath: 'date', options: { unique: false } },
          { name: 'message', keypath: 'message', options: { unique: false } },
        ]
      },
      {
        store: 'race_events',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'date', keypath: 'date', options: { unique: false } },
          { name: 'dt', keypath: 'dt', options: { unique: false } },
          { name: 'raceEventType', keypath: 'raceEventType', options: { unique: false } },
          { name: 'raceId', keypath: 'raceId', options: { unique: false } },
          { name: 'racerId', keypath: 'racerId', options: { unique: false } },
          { name: 'detail', keypath: 'detail', options: { unique: false } },
        ]
      },
    ],
    migrationFactory
  };
}
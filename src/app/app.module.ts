import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LogUpdateService } from './core/services/log-update.service';
import { CheckForUpdateService } from './core/services/check-for-update.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from './core/layout/layout.module';


export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db:any, transaction:any) => {
      const store = transaction.objectStore('users');
      store.createIndex('name', 'name', { unique: false });
    },
    3: (db:any, transaction:any) => {
      const store = transaction.objectStore('users');
      store.createIndex('email', 'email', { unique: false });
    }
  };
}

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 3,
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
    }
  ],
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxIndexedDBModule.forRoot(dbConfig),
    LayoutModule,
  ],
  providers: [
    LogUpdateService,
    CheckForUpdateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

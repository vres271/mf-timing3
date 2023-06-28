import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LogUpdateService } from './core/services/log-update.service';
import { CheckForUpdateService } from './core/services/check-for-update.service';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from './core/layout/layout.module';
import { getDBConfig } from './core/db/db.config';
import { LogItemsService } from './shared/services/log-items.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxIndexedDBModule.forRoot(getDBConfig({version: 8})),
    LayoutModule,
  ],
  providers: [
    LogUpdateService,
    CheckForUpdateService,
    LogItemsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { UsersService } from 'src/app/shared/services/users.service';
import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { EntityType } from './shared/models/items.model';
import { UsersMockData } from './shared/mocks/users.mock';
import { RacersMockData } from './shared/mocks/racers.mock';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{

  constructor(
    private usersService: UsersService,
    private dbService: NgxIndexedDBService,
    private primengConfig: PrimeNGConfig
  ) {
    this.usersService.generateUsers()
    this.primengConfig.ripple = true;
    this.dbService.bulkGet(EntityType.User, [1]).subscribe((result: any) => {
      if (!result?.[0]) {
        console.log('DB is empty. Adding data');
        this.dbService.bulkAdd(EntityType.User, UsersMockData)
          .subscribe((result) => {
            console.log(EntityType.User, result);
          });        
        this.dbService.bulkAdd(EntityType.Racer, RacersMockData)
          .subscribe((result) => {
            console.log(EntityType.Racer, result);
          });        
      }
    });    


  }



}

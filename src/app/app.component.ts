import { UsersService } from 'src/app/shared/services/users.service';
import { Component } from '@angular/core';
import { LogUpdateService } from './core/services/log-update.service';
import { CheckForUpdateService } from './core/services/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{

  constructor(
    private logUpdateService: LogUpdateService,
    private checkForUpdateService: CheckForUpdateService,
    private usersService: UsersService,
  ) {
    this.usersService.generateUsers()
  }



}

import { Component, OnInit } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { SerialComponent } from './serial/serial.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  currentComponent: any = GeneralComponent;
  header = 'General';

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.router.url === '/admin/users') {
      this.currentComponent = UsersComponent;
      this.header = 'Users';
    } else if(this.router.url === '/admin/serial') {
      this.currentComponent = SerialComponent;
      this.header = 'Serial Port';
    } else {
      this.currentComponent = GeneralComponent;
      this.header = 'General';
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralComponent } from './general/general.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentComponent = GeneralComponent;
  header = 'General';

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.router.url === '/admin/users') {
      this.currentComponent = UsersComponent;
      this.header = 'Users';
    } else {
      this.currentComponent = GeneralComponent;
      this.header = 'General';
    }
  }


}

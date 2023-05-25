import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() {

  }

  ngOnInit() {

    this.menuItems  = [
      { 
        label: 'General', 
        icon: 'pi pi-fw pi-home', 
        routerLink: '', 
        routerLinkActiveOptions: { exact: true } 
      },
      { 
        label: 'Users', 
        icon: 'pi pi-fw pi-users', 
        routerLink: 'users', 
        routerLinkActiveOptions: { exact: true } 
      },
    ];

  }


}

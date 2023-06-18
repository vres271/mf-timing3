import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  constructor() {

  }

  ngOnInit() {

    this.menuItems  = [
      { 
        label: 'General', 
        icon: 'pi pi-fw pi-home', 
        routerLink: '/admin/general', 
        routerLinkActiveOptions: { exact: true } 
      },
      { 
        label: 'Users', 
        icon: 'pi pi-fw pi-users', 
        routerLink: '/admin/users', 
        routerLinkActiveOptions: { exact: true } 
      },
      { 
        label: 'Serial', 
        icon: 'pi pi-fw pi-server', 
        routerLink: '/admin/serial', 
        routerLinkActiveOptions: { exact: true } 
      },
    ];

  }


}

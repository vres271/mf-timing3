import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  items: MenuItem[] = [
    { 
      label: 'About', 
      icon: 'pi pi-fw pi-home', 
      routerLink: '/lazy-home/about', 
      routerLinkActiveOptions: { exact: true } 
    },
    // { 
    //   label: 'Lazy Home', 
    //   icon: 'pi pi-fw pi-calendar', 
    //   routerLink: '/lazy-home', 
    //   routerLinkActiveOptions: { exact: true } 
    // },
    // { 
    //   label: 'Version', 
    //   icon: 'pi pi-fw pi-pencil', 
    //   routerLink: '/lazy-home/version', 
    //   routerLinkActiveOptions: { exact: true } 
    // },
    { 
      label: 'Race', 
      icon: 'pi pi-fw pi-car',
      routerLink: '/race', 
      routerLinkActiveOptions: { exact: true } 
    },
    { 
      label: 'Administration', 
      icon: 'pi pi-fw pi-cog',
      routerLink: '/admin', 
      routerLinkActiveOptions: { exact: true } 
    }
  ];
  
}

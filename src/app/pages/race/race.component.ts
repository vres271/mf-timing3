import { RacersService } from 'src/app/shared/services/racers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RacersComponent } from './racers/racers.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent  implements OnInit{

  currentComponent: any = RacersComponent;
  header = 'General';
  menuItems: MenuItem[] = [];
  
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    private racersService: RacersService,
  ) {
    this.racersService.generateRacers()
  }

  ngOnInit() {
    if (this.router.url === '/race/racers') {
      this.currentComponent = RacersComponent;
      this.header = 'Racers';
    } else {
      this.currentComponent = RacersComponent;
      this.header = 'Racers';
    }

    this.menuItems  = [
      { 
        label: 'General', 
        icon: 'pi pi-fw pi-home', 
        routerLink: '/race', 
        routerLinkActiveOptions: { exact: true } 
      },
      { 
        label: 'Racers', 
        icon: 'pi pi-fw pi-users', 
        routerLink: '/race/racers', 
        routerLinkActiveOptions: { exact: true } 
      },
    ];

  }

}

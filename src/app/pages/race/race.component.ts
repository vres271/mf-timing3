import { RacersService } from 'src/app/shared/services/racers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RacersComponent } from './racers/racers.component';
import { MenuItem } from 'primeng/api';
import { RacesComponent } from './races/races.component';
import { RacesService } from 'src/app/shared/services/races.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
})
export class RaceComponent  implements OnInit{

  currentComponent: any = RacersComponent;
  header = 'General';
  menuItems: MenuItem[] = [];
  
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    private racersService: RacersService,
    private racesService: RacesService,
  ) {
  }

  ngOnInit() {
    if (this.router.url === '/race/racers') {
      this.currentComponent = RacersComponent;
      this.header = 'Racers';
    } else if (this.router.url === '/race/races') {
      this.currentComponent = RacesComponent;
      this.header = 'Races';
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
      { 
        label: 'Races', 
        icon: 'pi pi-fw pi-flag', 
        routerLink: '/race/races', 
        routerLinkActiveOptions: { exact: true } 
      },
    ];

    forkJoin({
      racers: this.racersService.load(),
      races: this.racesService.load()
    }).subscribe(res => {
      
    } )

  }

}

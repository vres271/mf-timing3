import { RacersService } from '../../shared/services/racers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RacersComponent } from './racers/racers.component';
import { MenuItem } from 'primeng/api';
import { RacesComponent } from './races/races.component';
import { RacesService } from '../../shared/services/races.service';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { TimingComponent } from './timing/timing.component';
import { TimerMonitor, TimingService } from '../../shared/services/timing.service';
import { Timecontrol3MockService } from '../../core/services/drivers/timecontrol3.mock';
import { Config, ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
})
export class RaceComponent  implements OnInit, OnDestroy{

  currentComponent: any = RacersComponent;
  header = 'General';
  menuItems: MenuItem[] = [];
  
  timerMonitor$: Observable<TimerMonitor>;
  subs: Subscription[] = [];
  config: Config;

  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    private racersService: RacersService,
    private racesService: RacesService,
    private timingService: TimingService,
    private timecontrol3MockService: Timecontrol3MockService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.timerMonitor$ = this.timingService.timer.getMonitor();

    if (this.router.url === '/race/racers') {
      this.currentComponent = RacersComponent;
      this.header = 'Racers';
    } else if (this.router.url === '/race/races') {
      this.currentComponent = RacesComponent;
      this.header = 'Races';
    } else {
      this.currentComponent = TimingComponent;
      this.header = 'Timing';
    }

    this.menuItems  = [
      { 
        label: 'Timing', 
        icon: 'pi pi-fw pi-stopwatch', 
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

    this.subs.push(this.configService.get()
      .subscribe(config => {
        if (config) this.config = config;
      }))


  }
  
  get isTCMockEnabled() {
    return this.config?.data?.timecontrol?.device === 'timeControlMock'
  }

  get isMockSensorConnected() {
    return this.timecontrol3MockService.connected;
  }

  emitMockSensorEvent() {
    this.timecontrol3MockService.emitSensorEvent();
  }

  emitMockSensorEnter() {
    this.timecontrol3MockService.emitEnter();
  }

  emitMockSensorRacerNumInc() {
    this.timecontrol3MockService.emitRacerNumInc();
  }

  emitMockSensoRacerNumDec() {
    this.timecontrol3MockService.emitRacerNumDec();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


}

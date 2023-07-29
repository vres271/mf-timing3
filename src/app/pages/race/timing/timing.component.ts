import { TimingState, TimingTimer } from './../../../shared/services/timing.service';
import { UserDTO } from './../../../shared/models/user.model';
import { RacesService } from 'src/app/shared/services/races.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { Race } from 'src/app/shared/models/race.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RacersService } from 'src/app/shared/services/racers.service';
import { Racer, RacerDTO } from 'src/app/shared/models/racer.model';
import { RaceEventsService } from 'src/app/shared/services/race-events.service';
import { RaceEvent, RaceEventType } from 'src/app/shared/models/race-event.model';
import { Item } from 'src/app/shared/models/items.model';
import { Config, ConfigService } from 'src/app/core/services/config.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { TimerMonitor, TimingService } from 'src/app/shared/services/timing.service';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['timing.component.css'],
  providers: [ConfirmationService]
})
export class TimingComponent implements OnInit, OnDestroy{

  racesMenu: MenuItem[];
  subs: Subscription[] = [];

  eventTypesList = [
    {value: 0, label: 'All types'},
    {value: RaceEventType.Start, label: 'Start'},
    {value: RaceEventType.Point, label: 'Point'},
    {value: RaceEventType.Finish, label: 'Finish'},
  ];

  stateLabels = {
    [TimingState.Unknown] : 'Unknown',
    [TimingState.StandBy] : 'StandBy',
    [TimingState.Ready] : 'Ready',
    [TimingState.Race] : 'Race',
  }
  
  stateStyles = {
    [TimingState.Unknown] : 'p-button-secondary',
    [TimingState.StandBy] : 'p-button-info',
    [TimingState.Ready] : 'p-button-success',
    [TimingState.Race] : 'p-button-warning',
  }
  
  TimingState = TimingState;
  connecting = false;

  config: Config
  timerMonitor$: Observable<TimerMonitor>

  race: Race | undefined;
  racers: Racer[] | undefined;
  raceEvents: RaceEvent[];

  racerSelectVisible = false;
  selectedRacer!: Racer

  registerRacerVisible = false;

  resultsVisible = false;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private racesService: RacesService,
    private racersService: RacersService,
    private raceEventsService: RaceEventsService,
    private timingService: TimingService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
      this.subs.push(this.route.params.pipe(
        switchMap(params => this.racesService.get().pipe(map(races=>({races,params}))))
      ).subscribe(
        res => {
          const {races, params} = res;
          this.racesMenu = races.map(race => ({label: race.name, routerLink: '/race/timing/' + race.id}))
          this.race = races?.find(r => r.id === +params['raceId']);
          if (this.race) {
            this.timingService.setRace(this.race);
          }
        }
      ));

      this.timerMonitor$ = this.timingService.timer.getMonitor();

      this.subs.push(this.racersService.get()
        .subscribe(racers => this.racers = racers));

      this.subs.push(this.raceEventsService.load()
        .subscribe());

      this.subs.push(this.raceEventsService.get()
        .subscribe(raceEvents => {
          this.raceEvents = raceEvents.filter(e => e.raceId === this.race?.id)
        }))
      
      this.subs.push(this.configService.get()
        .subscribe(config => {
          if (config) this.config = config;
        }))
          
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  get state() {
    return this.timingService.state;
  }

  get connected() {
    return this.timingService.connected;
  }

  get racer() {
    return this.timingService.racer;
  }

  get timer():TimingTimer {
    return this.timingService.timer;
  }

  get autoStandBy():boolean {
    return this.timingService.autoStandByAfterFinish;
  }

  set autoStandBy(value: boolean) {
    this.timingService.autoStandByAfterFinish = value;
  }

  lapsToSteps():MenuItem[] {
    return this.timingService.getLaps().map(lap => ({label: new Date(lap.t || 0).toISOString().substring(11,23)}))
  }

  connect() {
    if (this.connected || this.connecting) { return; }
    this.connecting = true;
    this.timingService.connect()
      .subscribe(res => this.connecting = false)
  }

  setReady() {
    if (this.state === TimingState.Unknown) { return; }
    this.timingService.setReady();
  }

  selectRacer(e: any) {
    this.timingService.setRacer(e.data as Racer);
    this.racerSelectVisible = false;
  }

  showSelectRacerDialog() {
    if (this.state === TimingState.Unknown || this.state === TimingState.Race) { return; }
    this.racerSelectVisible = true;
  }

  filter(items: Item[], cond: any):Item[] {
    const [key, value] = Object.entries(cond)[0];
    return items.filter((item:any) => item[key] === value)
  }

  openRegisterNewRacerDialog() {
    this.registerRacerVisible = true;
  }


  openDeleteRaceEventDialog(item: RaceEvent) {
    this.confirmationService.confirm({
        message: 'Удалить точку?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.raceEventsService.delete(item.id)
            .subscribe(res => console.log('Delete RaceEvent', res))
        },
        reject: () => {

        }
    });
  }

  get resultsToFile() {
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.raceEvents
      .map(event => (event.racerNum || '-') + "\t" + (event.racerFullName || '-') + "\t" + event.raceEventTypeName + "\t" + event.dtString)
      .join("\n")
    );
  }

  showResults() {
    this.resultsVisible = true;
  }
}

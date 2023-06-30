import { UserDTO } from './../../../shared/models/user.model';
import { TimecontrolAPIService } from './../../../core/services/timecontrol-api.service';
import { RacesService } from 'src/app/shared/services/races.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, forkJoin, map, switchMap } from 'rxjs';
import { Race } from 'src/app/shared/models/race.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RacersService } from 'src/app/shared/services/racers.service';
import { Racer, RacerDTO } from 'src/app/shared/models/racer.model';
import { RaceEventsService } from 'src/app/shared/services/race-events.service';
import { RaceEvent, RaceEventType } from 'src/app/shared/models/race-event.model';
import { Item } from 'src/app/shared/models/items.model';
import { Timecontrol3MockService } from 'src/app/shared/mocks/timecontrol3.mock';
import { Config, ConfigService } from 'src/app/core/services/config.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  providers: [ConfirmationService]
})
export class TimingComponent implements OnInit, OnDestroy{

  racesMenu: MenuItem[];
  lapSteps: MenuItem[] = [];

  subs: Subscription[] = [];
  timerId: any;
  timer: string;
  timerStartTime: number;
  timerFinishTime: number;
  started = false;

  race: Race | undefined;
  races: Race[] | undefined;
  racers: Racer[] | undefined;

  stateLabel = 'StandBy';
  racerNum: number;
  racer: Racer | undefined;
  raceEvents: RaceEvent[];
  laps: number = 0;
  lap: number = 0;
  eventTypesList: any[];
  eventsFilter = {
    type: 0,
    num: '',
    name: '',
  }
  results: {
    bestFinish: RaceEvent[],
    bestLap: RaceEvent[],
  } = {
    bestFinish: [],
    bestLap: [],
  }

  racerSelectVisible = false;
  selectedRacer!: Racer

  registerRacerVisible = false;

  config: Config

  newRacer = {
    num:0,
    firstName:'',
    secondName:'',
    thirdName:'' ,
  };
  registerNewRacerError = '';

  resultsVisible = false;

  constructor(
    private racesService: RacesService,
    private racersService: RacersService,
    private usersService: UsersService,
    private raceEventsService: RaceEventsService,
    private route: ActivatedRoute,
    public timecontrolAPIService: TimecontrolAPIService,
    public timecontrol3MockService: Timecontrol3MockService,
    private configService: ConfigService,
    private confirmationService: ConfirmationService,
    ) {

  }

  ngOnInit() {
      this.eventTypesList = [
        {value: 0, label: 'All types'},
        {value: RaceEventType.Start, label: 'Start'},
        {value: RaceEventType.Point, label: 'Point'},
        {value: RaceEventType.Finish, label: 'Finish'},
      ]

      this.subs.push(
        this.configService.get()
          .subscribe(config => {
            if (config) {
              this.config = config;
            }
          })
      );
      this.subs.push(
      this.route.params.pipe(
        switchMap(params => this.racesService.get().pipe(map(races=>({races,params}))))
      ).subscribe(
        res => {
          const {races, params} = res;
          this.races = races;
          this.racesMenu = races.map(race => ({label: race.name, routerLink: '/race/timing/' + race.id}))
          this.race = races?.find(r => r.id === +params['raceId']);
        }
      ))

      this.subs.push(
      this.racersService.get()
        .subscribe(racers => this.racers = racers))

      this.subs.push(
      this.raceEventsService.load().subscribe());

      this.subs.push(
      this.raceEventsService.get()
        .subscribe(raceEvents => {
          this.raceEvents = raceEvents.filter(e => e.raceId === this.race?.id).sort((a,b) => (b.id - a.id))
        }))
      
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      
      this.timerId = setInterval(() => {
        if (this.timerStartTime) {
          const now = new Date().getTime();
          this.timer = new Date(now - this.timerStartTime).toISOString().substring(11,23); return;
        }
        if (this.timerFinishTime) {
          this.timer = new Date(this.timerFinishTime).toISOString().substring(11,23); return;
        }
        this.timer = '00:00:00.000';
      },100)

      this.subs.push(
      this.timecontrolAPIService.getInputStream()
        .subscribe(res => {
          console.log(res)

          switch (res?.command) {
            case 'ready':
              this.stateLabel = 'Ready';
              this.timerStartTime = 0;
              this.timerFinishTime = 0;
              this.laps = res.laps;
              this.lapSteps = []
              for (let i = 0; i < this.laps; i++) {
                this.lapSteps.push({label: '00:00:00.000'});
              }
              this.lap = 0;
              this.started = false;
              break;
            case 'in_menu':
              this.stateLabel = 'StandBy';
              this.timerStartTime = 0;
              this.timerFinishTime = 0;
              this.lap = 0;
              this.started = false;
              break;
            case 'set_racer':
              this.stateLabel = 'Ready';
              this.racerNum = res.racer;
              this.racer = this.racers?.find(r => r.num === this.racerNum);
              this.timerStartTime = 0;
              this.timerFinishTime = 0;
              this.lapSteps.forEach(step => {step.label = '00:00:00.000'})
              this.lap = 0;            
              break;
            case 'start':
              this.stateLabel = 'Ready';
              this.addRaceEvent(res, RaceEventType.Start)
              this.timerStartTime = new Date().getTime();
              this.timerFinishTime = 0;
              this.lapSteps.forEach(step => {step.label = '00:00:00.000'})
              this.lap = 0;
              this.started = true;
              break;
            case 'lap':
              this.stateLabel = 'Ready';
              this.addRaceEvent(res, RaceEventType.Point)
              this.lap++;
              this.lapSteps[this.lap-1].label = new Date(res.time).toISOString().substring(11,23);
              break;
            case 'finish':
              this.stateLabel = 'Ready';
              this.addRaceEvent(res, RaceEventType.Finish)
              this.timerFinishTime = res.time;
              this.timerStartTime = 0;
              this.started = false;
              break;
            default:
              break;
          }
        }))
      
  }

  connectToTC() {
    this.timecontrolAPIService.connect();
  }

  addRaceEvent(res: any, type: RaceEventType) {
    this.racerNum = res.racer;
    this.racer = this.racers?.find(r => r.num === this.racerNum);
    this.subs.push(
    this.raceEventsService.add({
      id: 0,
      date: new Date().getTime(),
      dt: res.time,
      raceEventType: type,
      raceId: this.race?.id || 0,
      racerId: this.racer?.id || 0,
      detail: {cmd_racer: res.racer},
    }).subscribe());
  }

  selectRacer(e: any) {
    this.timecontrolAPIService.sendComand( 'set_racer', [+e.data.num]);
    this.racerSelectVisible = false;
  }

  setReady() {
    this.timecontrolAPIService.sendComand(this.stateLabel === 'Ready' ? '^' : 'set_ready');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  filter(items: Item[], cond: any):Item[] {
    const [key, value] = Object.entries(cond)[0];
    return items.filter((item:any) => item[key] === value)
  }

  get isTCMockEnabled() {
    return this.config?.data?.timecontrol?.device === 'timeControlMock'
  }

  emitMockSensorEvent() {
    this.timecontrol3MockService.emitSensorEvent();
  }

  openRegisterNewRacerDialog() {
    this.newRacer = {
      num: (this.racers?.filter(racer => racer.raceId === this.race?.id).reduce((p, v) =>  ( p.num > v.num ? p : v )).num  || 0) + 1,
      firstName:'',
      secondName:'',
      thirdName:'' ,  
    }
    this.registerRacerVisible = true;
  }

  validateNewRacerNum() {
    this.registerNewRacerError = '';
    if (this.racers?.find(racer => +this.newRacer?.num === +racer.num )) {
      this.registerNewRacerError = 'Racer Number already exists';
    }
  }

  registerNewRacer() {
    const user: UserDTO =  {
      id: 0,
      name: '',
      firstName: this.newRacer.firstName,
      secondName: this.newRacer.secondName,
      thirdName: this.newRacer.thirdName,
      email: '',
      active: true,
    }
    this.subs.push(
    this.usersService.add(user)
      .pipe(
        switchMap(createdUser => {
          const racer: RacerDTO = {
            id: 0,
            userId: createdUser.id,
            raceId: this.race?.id || 0,
            categoryId: 0,
            regDate: new Date().getTime(),
            num: +this.newRacer.num,
          }
          return this.racersService.add(racer)
        })
      )
      .subscribe(createdRacer => {
        if(createdRacer?.id) {
          console.log('New Racer Created', createdRacer);
          this.registerRacerVisible = false;
        } else {
          console.warn('Error creating Racer', createdRacer);
        }
      }))
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
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.filterEvents(this.raceEvents)
      .map(event => (event.racerNum || '-') + "\t" + (event.racerFullName || '-') + "\t" + event.raceEventTypeName + "\t" + event.dtString)
      .join("\n")
    );
  }

  filterEvents(items: RaceEvent[]):RaceEvent[] {
    const regexp = this.eventsFilter.name ? new RegExp(this.eventsFilter.name, "ig") : null;
    return items.filter(item => {
      return (+item.racerNum === +this.eventsFilter.num || !this.eventsFilter.num) 
        && (!regexp || regexp.test(item.racerFullName))
        && (item.raceEventType === this.eventsFilter.type || !this.eventsFilter.type)
    })
  }
 
  resetEventFilter() {
    this.eventsFilter.num = '';
    this.eventsFilter.name = '';
    this.eventsFilter.type = 0;
  }

  showResults() {
    this.resultsVisible = true;

    let min: any = {};
    this.results.bestFinish = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Finish)
        .sort((a,b) => a.dt - b.dt)
        .filter(item => {
          if (min[item.racerId] === undefined) {
            min[item.racerId] = true;
            return true;
          } else {
            return false;
          }
        })

    min = {}
    this.results.bestLap = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Point)
        .sort((a,b) => a.dt - b.dt)
        .filter(item => {
          if (min[item.racerId] === undefined) {
            min[item.racerId] = true;
            return true;
          } else {
            return false;
          }
        })

  }

}

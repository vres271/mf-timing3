import { RacersService } from './racers.service';
import { Injectable } from '@angular/core';
import { TimecontrolAPIService, TimecontrolInputCommand, TimecontrolInputDTO, TimecontrolOutputCommand, TimecontrolOutputDTO } from 'src/app/core/services/drivers/timecontrol-api.service';
import { Racer } from '../models/racer.model';
import { RaceEventType } from '../models/race-event.model';
import { Race } from '../models/race.model';
import { RaceEventsService } from './race-events.service';
import { Observable, Subject, distinctUntilChanged, filter, interval, map, tap } from 'rxjs';

export enum TimingType {
  Laps = 1
}

export enum TimingState {
  Unknown,
  StandBy,
  Ready,
  Race,
}

export interface TimingLap {
  t: number;
  time: number
}

export interface TimerMonitor {
  t: number;
  raceTime: number;
  lapTime: number;
}

export class TimingTimer {

  startTime: number = 0;
  finishTime: number = 0;
  finishT: number = 0;
  lapsCount: number = 1;
  laps: TimingLap[];
  lap: number = 0;
  started = false;

  constructor() {
  }

  getMonitor():Observable<TimerMonitor> {
    return interval(10).pipe(
      map(() => {
        const t = new Date().getTime();
        return {
          t,
          raceTime: this.started ? t - this.startTime : this.finishT,
          lapTime: this.started ? t - (this.previousLap?.time || this.startTime) : this.previousLap?.t,
        }
      }),
      distinctUntilChanged((prev, curr) => prev.raceTime === curr.raceTime),
    )
  }

  get firstLap() {
    return this.laps?.[0];
  }

  get curentLap() {
    return this.laps?.[this.lap];
  }

  get previousLap() {
    return this.laps?.[this.lap-1];
  }

  get lastLap() {
    return this.laps?.[this.laps?.length-1];
  }

  reset(lapsCount?: number) {
    this.startTime = 0;
    this.finishTime = 0;
    this.finishT = 0;
    this.lap = 0;
    if (lapsCount) {
      this.lapsCount = lapsCount;
    }
    this.laps = [];
    for (let i = 0; i < this.lapsCount; i++) {
      this.laps.push({t:0, time: 0});
    }
  }

  registerStart() {
    this.started = true;
    this.startTime = new Date().getTime();
  }

  registerLap(t: number) {
    this.laps[this.lap++] = {t, time: new Date().getTime()}
  }

  registerFinish(dt:number) {
    this.started = false;
    this.finishTime = new Date().getTime();
    this.finishT = dt;
  }

}

@Injectable()
export class TimingService {
  type = TimingType.Laps;
  state = TimingState.Unknown;
  racer: Racer;
  race: Race;

  connected = false;
  timer: TimingTimer;

  constructor(
    private timecontrolAPIService: TimecontrolAPIService,
    private racersService: RacersService,
    private raceEventsService: RaceEventsService,
  ) {
    this.timer = new TimingTimer();
    this.init();
  }

  connect() {
    this.timecontrolAPIService.connect();
    return this.timecontrolAPIService.connected$;
  }

  setRace(race: Race) {
    if (this.state !== TimingState.Unknown) {
      return;
    }
    this.race = race;
  }

  getLaps() {
    return this.timer.laps;
  }

  init() {

    this.timecontrolAPIService.connected$
      .subscribe(connected => {
        if (connected) {
          this.connected = true;
          this.state = TimingState.StandBy;
        }
      })

    this.timecontrolAPIService.output()
      .subscribe(tcMessage => {
        switch (tcMessage?.command) {
          case TimecontrolOutputCommand.READY:
            this.state = TimingState.Ready;
            if (tcMessage.laps) {
              this.timer.reset(tcMessage.laps);
            }
            break;
          case TimecontrolOutputCommand.IN_MENU:
            this.state = TimingState.StandBy;
            break;
          case TimecontrolOutputCommand.SET_RACER:
            if (tcMessage.racer) {
              this.racer = this.racersService.getCachedById(tcMessage.racer);
              this.timer.reset();
            }
            break;
          case TimecontrolOutputCommand.START:
            this.state = TimingState.Race;
            this.timer.reset();
            this.timer.registerStart();
            this.addRaceEvent(tcMessage, RaceEventType.Start);
            break;
          case TimecontrolOutputCommand.LAP:
            this.timer.registerLap(tcMessage.time || 0);
            this.addRaceEvent(tcMessage, RaceEventType.Point);
            break;
          case TimecontrolOutputCommand.FINISH:
            this.state = TimingState.StandBy;
            this.timer.registerFinish(tcMessage.time || 0);
            this.addRaceEvent(tcMessage, RaceEventType.Finish);
            break;
          default:
            break;
        }
      });        
  }

  setReady() {
    this.timecontrolAPIService.input({
      cmd: this.state === TimingState.Ready ? TimecontrolInputCommand.UP : TimecontrolInputCommand.SET_READY,
    });
  }

  setRacer(racer: Racer) {
    this.timecontrolAPIService.input({
      cmd: TimecontrolInputCommand.SET_RACER,
      value: [+racer.num],
    });
  }

  addRaceEvent(mess: TimecontrolOutputDTO, type: RaceEventType) {
    this.raceEventsService.add({
      id: 0,
      date: new Date().getTime(),
      dt: mess.time || 0,
      raceEventType: type,
      raceId: this.race?.id || 0,
      racerId: this.racer?.id || 0,
      detail: {cmd_racer: mess.racer},
    }).subscribe();
  }



}

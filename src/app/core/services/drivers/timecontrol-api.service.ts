import { Injectable } from '@angular/core';
import { Subject, filter, map, switchMap } from 'rxjs';
import { SerialService } from './serial.service';
import { Timecontrol3MockService } from 'src/app/core/services/drivers/timecontrol3.mock';
import { ConfigService } from '../config.service';
import { DriverConnectionState, DriverService } from './driver.service';


export interface TimecontrolInputDTO {
  cmd: TimecontrolInputCommand, 
  value?: number[]
}

export enum TimecontrolInputCommand {
  SET_RACER = 'set_racer',
  SET_READY = 'set_ready',
  UP = '^',
}

export interface TimecontrolOutputDTO {
    command: TimecontrolOutputCommand;
    racer?: number;
    time?: number;
    laps?: number;
    raw: string;
}
export enum TimecontrolOutputCommand {
  CONNECTED = 'connect_timecontrol3',
  READY = 'ready',
  IN_MENU = 'in_menu',
  SET_RACER = 'set_racer',
  START = 'start',
  LAP = 'lap',
  FINISH = 'finish',
}

@Injectable({
  providedIn: 'root'
})
export class TimecontrolAPIService extends DriverService<TimecontrolInputDTO, TimecontrolOutputDTO>{
  id = 2;
  name = 'Timecontrol3 Device';

  serialService: SerialService;
  connected$ = new Subject<boolean>();


  constructor(
    private _serialService: SerialService,
    private _timecontrol3MockService: Timecontrol3MockService,
    private configService: ConfigService,
  ) {
    super();
    this.configService.get()
      .subscribe(config => {
        if (config?.data?.timecontrol?.device === 'timeControlMock') {
          this.serialService = this._timecontrol3MockService;
        } else {
          this.serialService = this._serialService;
        }
      })
  }

  get connected() {
    return this.connectionState === DriverConnectionState.Connected
  }

  override connect() {
    if (this.connected) return
    this.connectionState = DriverConnectionState.Disconnected;
    console.log('Connecting ', this.name ,'to', this.serialService.name);
    this.serialService.output()
      .subscribe(message => {
        const splitted = String(message)?.trim()?.replace('\n', '')?.replace('\r', '')?.split(' ');
        if(splitted[0] === 'api') {
          const res: TimecontrolOutputDTO = {
            command: splitted?.[1] as TimecontrolOutputCommand,
            racer: +splitted?.[2],
            time: +splitted?.[3],
            raw: message,
          }
          if(splitted?.[4]) {
            res.laps = +splitted?.[4];
          }
          if(res.command === TimecontrolOutputCommand.CONNECTED) {
            super.connect();
            this.connected$.next(true);
          }
          this.outputStream$.next(res);
        }
      });

    this.inputStream$.subscribe(command => {
      this.sendComand(command.cmd, command.value);
    })

    this.serialService.connect();
    return this.connected$;
  }

  override disconnect() {
    this.serialService.disconnect();
    super.disconnect()
  }

  sendComand(cmd: string, value?: number[]) {
    this.sendText(`${cmd}` + (value?.length ? (' ' + value.join(' ')) : '') + `;`);
  }

  sendText(message: string) {
    this.serialService.input(message);
  }

}

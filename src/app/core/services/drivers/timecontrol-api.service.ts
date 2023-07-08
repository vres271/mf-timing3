import { Injectable } from '@angular/core';
import { Subject, filter, map, switchMap } from 'rxjs';
import { SerialService } from './serial.service';
import { Timecontrol3MockService } from 'src/app/core/services/drivers/timecontrol3.mock';
import { ConfigService } from '../config.service';
import { DriverConnectionState, DriverService } from './driver.service';

export interface TimecontrolMessage {
    command: string;
    racer?: number;
    time?: number;
    laps?: number;
    raw: string;
}

export interface TimecontrolCommand {
  cmd: string, 
  value?: number[]
}

@Injectable({
  providedIn: 'root'
})
export class TimecontrolAPIService extends DriverService<TimecontrolCommand, TimecontrolMessage>{
  id = 2;
  name = 'Timecontrol3 Device';

  connected = false;
  serialService: SerialService;

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

  override connect() {
    if (this.connected) return
    this.connected = false;
    this.connectionState = DriverConnectionState.Disconnected;
    this.serialService.getOutputStream()
      .subscribe(message => {
        const splitted = message.trim().replace('\n', '').replace('\r', '').split(' ');
        if(splitted[0] === 'api') {
          const res:TimecontrolMessage = {
            command: splitted?.[1],
            racer: +splitted?.[2],
            time: +splitted?.[3],
            raw: message,
          }
          if(splitted?.[4]) {
            res.laps = +splitted?.[4];
          }
          if(res.command === 'connect_timecontrol3') {
            this.connected = true;
            super.connect();
          }
          this.outputStream$.next(res);
        }
      });

    this.inputStream$.subscribe(command => {
      this.sendComand(command.cmd, command.value);
    })

    this.serialService.connect();
    
  }

  sendComand(cmd: string, value?: number[]) {
    this.sendText(`${cmd}` + (value?.length ? (' ' + value.join(' ')) : '') + `;`);
  }

  sendText(message: string) {
    this.serialService.getInputStream().next(message);
  }

}

import { Injectable } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { SerialService } from './serial.service';
import { Timecontrol3MockService } from 'src/app/shared/mocks/timecontrol3.mock';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TimecontrolAPIService {
  connected = false;
  serialService: SerialService;

  constructor(
    private _serialService: SerialService,
    private _timecontrol3MockService: Timecontrol3MockService,
    private configService: ConfigService,
  ) {
    this.configService.get()
      .subscribe(config => {
        if (config?.data?.timecontrol?.device === 'timeControlMock') {
          this.serialService = this._timecontrol3MockService;
        } else {
          this.serialService = this._serialService;
        }
      })
    
  }

  getInputStream() {
    return this.serialService.getInputStream().pipe(
      map(message => {
        console.log(message)
        const splitted = message.trim().replace('\n', '').replace('\r', '').split(' ');
        if(splitted[0] === 'api') {
          const res:any = {
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
          }
          return res;
        }
        return null;
      }),
      filter(res => res !== null),
    )
  }

  connect() {
    if (this.connected) return
    this.connected = false;
    this.serialService.start();
  }

  sendComand(cmd: string, value?: number[]) {
    this.sendText(`${cmd}` + (value?.length ? (' ' + value.join(' ')) : '') + `;`);
  }

  sendText(message: string) {
    this.serialService.send(message);
  }

}

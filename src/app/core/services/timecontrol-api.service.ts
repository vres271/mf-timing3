import { Injectable } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { SerialService } from './serial.service';

@Injectable({
  providedIn: 'root'
})
export class TimecontrolAPIService {
  connected = false;

  constructor(private serialService: SerialService) {
  }

  getInputStream() {
    return this.serialService.getInputStream().pipe(
      map(message => {
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
    this.connected = false;
    this.serialService.start();
  }

  sendComand(cmd: string, value?: number[]) {
    this.sendText(`api ${cmd}` + (value?.length ? (' ' + value.join(' ')) : ''));
  }

  sendText(message: string) {
    this.serialService.send(message);
  }

}

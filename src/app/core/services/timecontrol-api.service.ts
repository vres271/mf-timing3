import { Injectable } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { SerialService } from './serial.service';

@Injectable({
  providedIn: 'root'
})
export class TimecontrolAPIService {

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
          return res;
        }
        return null;
      }),
      filter(res => res !== null),
    )
  }

  connect() {
    this.serialService.start();
  }

}

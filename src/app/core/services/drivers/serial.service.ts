import { LogItemDTO, LogItemType } from 'src/app/shared/models/log-item.model';
import { LogItemsService } from '../../../shared/services/log-items.service';
import { Injectable, Output } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { Driver, DriverConnectionState, DriverService } from './driver.service';

export enum SerialMessageDirection {
  Input = 1,
  Output,
}

@Injectable({
  providedIn: 'root'
})
export class SerialService extends DriverService<string, string> implements Driver<string, string>{
  id = 1;
  name = 'Serial Port';
  connectionState = DriverConnectionState.Disconnected

  nav: any;
  serial: any;
  port: any;

  constructor(
    public logItemsService: LogItemsService
  ) {
    super();
    this.nav = navigator;
    this.serial = this.nav.serial;

  }

  start() {
    this._start();
    this.connectionState = DriverConnectionState.Connected;
    this.inputStream$.subscribe(message => {
      this.send(message);
    })     
  }

  send(message: string) {
    this.write(message);
  }

  async _start() {
    await this.requestPort();
    await this.openPort();
    await this.read();
  }

  async requestPort() {
    const port = await this.serial.requestPort().catch((e:any) => console.warn('Serial port requestPort error', e));
    this.port = port;
  }

  async openPort() {
    if (!this.port) return;
    const OpenRes = await this.port.open({ 
      baudRate: 9600 , 
      bufferSize: 2048,
      dataBits: 8,
      stopBits: 1,
      parity : "none",
      flowControl  : "none",
    });
    console.log('OpenRes', OpenRes, this.port.getInfo());
  }

  async closePort() {
    const closeRes = await this.port.close();
    console.log('closeRes', closeRes);
  }

  async read() {
    if (!this.port) return;
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);

    while (this.port.readable) {
      const reader = textDecoder.readable.getReader();
      // const reader = this.port.readable.getReader();
      try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
            }
            if (value) {
              // console.log(value);
              this.outputStream$.next(value);
              this.log(value, SerialMessageDirection.Input);
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
          console.warn('Serial non-fatal read error', error);
        }
    }
  }

  async write(message: string) {
    const encoder = new TextEncoder();
    const writer = this.port.writable.getWriter();
    const encoded = encoder.encode(message+"\n");
    const writeRes = await writer.write(encoded);
    this.log(message, SerialMessageDirection.Output);
    console.log('send:', message);
    writer.releaseLock();
  }

  log(message: string, direction: SerialMessageDirection) {
    const logItem: LogItemDTO = {
      id: 0,
      logItemType: LogItemType.Serial,
      date: (new Date).getTime(),
      detail: {message, direction}
    }
    this.logItemsService.add(logItem)
      .subscribe()
  }

}

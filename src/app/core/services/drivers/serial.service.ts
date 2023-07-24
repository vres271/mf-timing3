import { LogItemDTO, LogItemType } from 'src/app/shared/models/log-item.model';
import { LogItemsService } from '../../../shared/services/log-items.service';
import { Injectable, Output } from '@angular/core';
import { Subject, Subscription, switchMap } from 'rxjs';
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

  nav: any;
  serial: any;
  port: any;

  textDecoder: any;
  readableStreamClosed: any;
  reader: any;

  textEncoder: any;
  writer: any;
  writableStreamClosed: any;

  constructor(
    public logItemsService: LogItemsService
  ) {
    super();
    this.nav = navigator;
    this.serial = this.nav.serial;
  }

  override connect() {
    this._start()
    this.subs.forEach(sub => sub.unsubscribe())
    this.subs.push(this.inputStream$.subscribe(message => {
      this.send(message);
    }));

    super.connect();
  }

  override async disconnect() {
    this.reader.cancel();
    await this.readableStreamClosed.catch(() => { /* Ignore the error */ });
    // this.writer.close();
    // await this.writableStreamClosed.catch(() => { /* Ignore the error */ });
    // console.log('writer.close')
    await this.port.close();
    super.disconnect()
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
  }

  async closePort() {
    const closeRes = await this.port.close();
  }

  async read() {
    if (!this.port) return;
    this.textDecoder = new TextDecoderStream();
    this.readableStreamClosed = this.port.readable.pipeTo(this.textDecoder.writable);
    this.reader = this.textDecoder.readable.getReader();

    while (this.port.readable && this.connectionState === DriverConnectionState.Connected) {
      const { value, done } = await  this.reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        this.reader.releaseLock();
        break;
      }
      if (value) {
        this.outputStream$.next(value);
        // this.log(value, SerialMessageDirection.Input);
      }
    }
  }

  async write(message: string) {
    this.textEncoder = new TextEncoder();
    this.writer = this.port.writable.getWriter();
    // this.writableStreamClosed = this.textEncoder.readable.pipeTo(this.port.writable);
    const encoded = this.textEncoder.encode(message+"\n");
    const writeRes = await this.writer.write(encoded);
    // this.log(message, SerialMessageDirection.Output);
    this.writer.releaseLock();
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

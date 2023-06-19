import { Component, ElementRef, OnInit } from '@angular/core';
import { SerialService } from 'src/app/core/services/serial.service';
import { TimecontrolAPIService } from 'src/app/core/services/timecontrol-api.service';

@Component({
  selector: 'app-serial',
  templateUrl: './serial.component.html',
  styleUrls: ['./serial.component.css']
})
export class SerialComponent implements OnInit{

  output = '';
  nav:any = navigator;
  serial:any = this.nav.serial;
  port: any = null;
  message = '';

  outputElem: ElementRef;

  constructor(
    private serialService: SerialService,
    private timecontrolAPIService: TimecontrolAPIService,
  ) {

  }

  ngOnInit() {
    // this.serialService.getInputStream()
    //   .subscribe(res => {
    //     console.log('message from Serial service stream', res)
    //   })

      this.timecontrolAPIService.getInputStream()
      .subscribe(res => {
        console.log('message from timecontrolAPI service stream', res)
      })
  }

  print(value: string) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    this.output =  this.output+value;
  }

  async getPorts() {
    const ports = await this.serial.getPorts();
    console.log(ports, ports.map((p:any) => p.getInfo()));
    this.print(ports);
    this.print(ports.map((p:any) => p.getInfo()));
  }

  async requestPort() {

    const port = await this.serial.requestPort().catch((e:any) => console.warn('Serial port requestPort error', e));
    console.log(port, port.getInfo());
    this.print(port);
    this.port = port;

  }

  async openPort() {
    const OpenRes = await this.port.open({ 
      baudRate: 9600 , 
      bufferSize: 2048000,
      dataBits: 8,
      stopBits: 1,
      parity : "none",
      flowControl  : "none",
    });
    console.log('OpenRes', OpenRes, this.port.getInfo());

    await this.read();
  }

  async closePort() {
    const closeRes = await this.port.close();
    console.log('closeRes', closeRes);
  }

  sendMessage() {
    this.write(this.message);
  }

  async read() {

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
              this.print(value);
              console.log(value);
              setTimeout(()=>document.getElementById('outputElem')?.scrollTo(0, 1000000),100);
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
    console.log('writeRes', encoded, writeRes);
    this.message = '';
    writer.releaseLock();
  }

  startService() {
    this.serialService.start();
  }

  startAPIService() {
    this.timecontrolAPIService.connect();
  }




}

import { Subscription, race } from 'rxjs';
import { DriverConnectionStateNames, DriverValueDirection } from './../../../core/services/drivers/driver.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DriverService } from 'src/app/core/services/drivers/driver.service';
import { SerialService } from 'src/app/core/services/drivers/serial.service';
import { TimecontrolAPIService } from 'src/app/core/services/drivers/timecontrol-api.service';
import { Timecontrol3MockService } from 'src/app/core/services/drivers/timecontrol3.mock';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent  implements OnInit, OnDestroy{
  items: DriverService<any, any>[];
  driverConnectionStateNames = DriverConnectionStateNames;
  selectedItem:  DriverService<any, any>;
  ioVisible = false
  ioLogItems: any = [];
  subs: Subscription[] = [];

  DriverValueDirection = DriverValueDirection
  valueToSend: string;

  constructor(
    private serialService: SerialService,
    private timecontrolAPIService: TimecontrolAPIService,
    private timecontrol3MockService: Timecontrol3MockService,
  ) { }

  ngOnInit() {
    this.items = [
      this.serialService,
      this.timecontrolAPIService,
      this.timecontrol3MockService,
    ]
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  openIOLogSidebar() {

    this.subs.push(race(
        this.selectedItem.getInputStream(),
        this.selectedItem.getOutputStream(),
      )
      .subscribe(() => {
        this.ioLogItems = this.selectedItem.ioLog.input
          .concat(this.selectedItem.ioLog.output)
          .sort((a, b) => b.t - a.t)
      }))

    this.ioLogItems = this.selectedItem.ioLog.input
      .concat(this.selectedItem.ioLog.output)
      .sort((a, b) => b.t - a.t)
    this.ioVisible = true;
  }

  closeIOLogSidebar() {
    this.ioVisible = false;
    this.subs.forEach(sub => sub.unsubscribe());
    this.selectedItem = null as any;
  }

  dateString(t: number) {
    return new Date(t).toLocaleTimeString();
  }

  sendValue(value: string) {
    let parsed: any;
    try {
      parsed = JSON.parse(value);
    } catch (error) {
      parsed = value;
    }
    this.selectedItem.input(parsed);
  }

}

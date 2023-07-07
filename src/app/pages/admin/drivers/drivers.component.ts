import { DriverConnectionStateNames } from './../../../core/services/drivers/driver.service';
import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/core/services/drivers/driver.service';
import { SerialService } from 'src/app/core/services/drivers/serial.service';
import { TimecontrolAPIService } from 'src/app/core/services/drivers/timecontrol-api.service';
import { Timecontrol3MockService } from 'src/app/core/services/drivers/timecontrol3.mock';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent  implements OnInit{
  items: DriverService<any, any>[];
  driverConnectionStateNames = DriverConnectionStateNames;
  selectedItem:  DriverService<any, any>;
  ioVisible = false
  ioLogItems: any = [];

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

  openIOLogSidebar() {
    this.ioLogItems = this.selectedItem.ioLog.input
      .concat(this.selectedItem.ioLog.output)
      .sort((a, b) => b.t - a.t)
    this.ioVisible = true;
  }

  dateString(t: number) {
    return new Date(t).toLocaleTimeString();
  }

}

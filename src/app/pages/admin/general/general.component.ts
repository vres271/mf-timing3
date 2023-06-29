import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Config, ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
})
export class GeneralComponent implements OnInit, OnDestroy{

  subs: Subscription[] = [];
  configItem$: BehaviorSubject<Config|null>;

  constructor(
    private configService: ConfigService,
  ) {

  }

  ngOnInit() {
    this.configItem$ = this.configService.get();
  }

  saveConfig(item: Config) {
    this.subs.push(
    this.configService.save(item)
      .subscribe())
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


}

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
})
export class GeneralComponent implements OnInit{

  configItem$: Observable<Config>;

  constructor(
    private configService: ConfigService,
  ) {

  }

  ngOnInit() {
    this.configItem$ = this.configService.get();
    this.configService.load()
      .subscribe()
  }

}

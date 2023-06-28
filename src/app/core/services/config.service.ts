import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { EntityType, Item } from 'src/app/shared/models/items.model';

export class ConfigDTO{
  data: {
    timecontrol:{
      device: 'serialPort' | 'timeControlMock'
    }
  } = {
    timecontrol:{
      device: 'serialPort'
    }
  }
}

export class Config{

  data: ConfigDTO['data'];

  constructor(dto: ConfigDTO) {
    const empty:ConfigDTO = <ConfigDTO>{};
    
    console.log(empty)
    this.data = dto.data;
  }

}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  items$ = new Subject<Config>();
  
  constructor(
    public apiService: APIService,
  ) { 
    this.apiService.get<ConfigDTO>(EntityType.Config)
      .subscribe(res => {
        if (!res?.length) {
          const emptyConfig = new ConfigDTO();
          this.apiService.add<ConfigDTO>(EntityType.Config, emptyConfig)
            .subscribe(res2 => {
              console.log('created')
            })
        
        }
      })   
  }

  get():Observable<Config> {
    return this.items$;
  }

  load():Observable<ConfigDTO[]> {
    return this.apiService.get<ConfigDTO>(EntityType.Config)
      .pipe(tap((dtos: ConfigDTO[] ) => {
        this.items$.next(new Config(dtos[0]));
      }));
  }


}

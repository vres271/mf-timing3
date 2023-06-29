import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { EntityType, Item } from 'src/app/shared/models/items.model';

export class ConfigDTO{
  id: number;
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
    this.data = dto.data;
  }

}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  item$ = new BehaviorSubject<Config|null>(null);
  item: Config;
  id: number;

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
              this.item$.next(this.item);
            })        
        }
      })   
  }

  get():BehaviorSubject<Config|null> {
    console.log(this.item)
    this.item$.next(this.item);
    return this.item$;
  }

  load():Observable<ConfigDTO[]> {
    return this.apiService.get<ConfigDTO>(EntityType.Config)
      .pipe(tap((dtos: ConfigDTO[] ) => {
        this.id = dtos[0].id;
        this.item = new Config(dtos[0])
        this.item$.next(this.item);
      }));
  }

  save(item: Config):Observable<ConfigDTO[]> {
    const dto: ConfigDTO = {
      id: this.id,
      data: item.data,
    }
    return this.apiService.update<ConfigDTO>(EntityType.Config, [dto])
      .pipe(tap((savedDTOs: ConfigDTO[] ) => {
        this.item = new Config(savedDTOs[0])
        this.item$.next(this.item);
      }));
  }


}

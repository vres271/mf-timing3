import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  map:any = {
    users: {id: {}},
    racers: {id: {}},
  };

  items:any =  {
    users: [],
    racers: [],
  };
  
  constructor() { }

  createMap(key: string) {
    this.items[key].forEach((item: any) => {
      this.map[key].id[item.id] = item;
    });
  }

}

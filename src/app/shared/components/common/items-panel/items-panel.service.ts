import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ItemsPanelService {

  private save$ = new Subject<any>();

  constructor() { }

  onSave() {
    return this.save$;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';

import { UsersService } from 'src/app/shared/services/users.service';
import { RacesService } from 'src/app/shared/services/races.service';
import { map, of } from 'rxjs';
import { RaceDTO, RaceType } from 'src/app/shared/models/race.model';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';

@Component({
  selector: 'app-races-editor',
  templateUrl: './races-editor.component.html',
})
export class RacesEditorComponent implements OnInit  {

  @Input() items: Item[]

  editFields: EditField[];

  constructor(
    public racesService: RacesService,
    private usersService: UsersService,
  ) {
    
  }

  ngOnInit() {
    this.editFields = [
      {name: 'name', title: 'name', type: 'text' },
      {name: 'startDate', title: 'startDate', type: 'date' },
      {name: 'raceType', title: 'raceType', type: 'list', list: of([
          {value: RaceType.Standart, label: 'Standart Race'},
          {value: RaceType.PumpBattle, label: 'Pump Battle' },
        ])
      },
    ]
  }

  save(item: RaceDTO) {
    this.racesService.save(item)
      .subscribe()    
  }

  add(item: RaceDTO) {
    this.racesService.add(item)
      .subscribe()    
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';

import { UsersService } from 'src/app/shared/services/users.service';
import { RacersService } from 'src/app/shared/services/racers.service';
import { map } from 'rxjs';
import { RacerDTO } from 'src/app/shared/models/racer.model';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { RacesService } from 'src/app/shared/services/races.service';

@Component({
  selector: 'app-racers-editor',
  templateUrl: './racers-editor.component.html',
})
export class RacersEditorComponent implements OnInit  {

  @Input() items: Item[]

  editFields: EditField[];

  constructor(
    public racersService: RacersService,
    private usersService: UsersService,
    private racesService: RacesService,
  ) {
    
  }

  ngOnInit() {
    this.editFields = [
      {name: 'user', title: 'User', type: 'list', list: this.usersService.getAsDictionary('fullName')},
      {name: 'race', title: 'Race', type: 'list', list: this.racesService.getAsDictionary()},
      // {name: 'categoryId', title: 'categoryId', type: 'number' },
      {name: 'regDate', title: 'regDate', type: 'date' },
      {name: 'num', title: 'num', type: 'number' },
    ]
  }

  save(dtos: RacerDTO[]) {
    console.log('save', dtos);
    return;
    this.racersService.save(dtos)
      .subscribe(res => console.log(res))    
  }

  add(item: RacerDTO) {
    console.log('add', item);
    return;
    this.racersService.add(item)
      .subscribe()    
  }

}

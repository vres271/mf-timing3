import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';
import { EditField } from '../racers.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { RacersService } from 'src/app/shared/services/racers.service';
import { map } from 'rxjs';
import { RacerDTO } from 'src/app/shared/models/racer.model';

@Component({
  selector: 'app-racers-editor',
  templateUrl: './racers-editor.component.html',
  styleUrls: ['./racers-editor.component.css']
})
export class RacersEditorComponent implements OnInit  {

  @Input() items: Item[]

  editFields: EditField[];

  constructor(
    public racersService: RacersService,
    private usersService: UsersService,
  ) {
    
  }

  ngOnInit() {
    this.editFields = [
      {name: 'id', title: 'id', type: 'number' },
      {name: 'userId', title: 'userId', type: 'list', list: this.usersService.get()
        .pipe(
          map(users => users
            .map(user => ({value: user.id, label: user.fullName}))
          )
        )},
      {name: 'raceId', title: 'raceId', type: 'number' },
      {name: 'categoryId', title: 'categoryId', type: 'number' },
      {name: 'regDate', title: 'regDate', type: 'date' },
      {name: 'num', title: 'num', type: 'number' },
    ]
  }

  save(item: RacerDTO) {
    this.racersService.save(item)
      .subscribe()    
  }

  add(item: RacerDTO) {
    this.racersService.add(item)
      .subscribe()    
  }

}

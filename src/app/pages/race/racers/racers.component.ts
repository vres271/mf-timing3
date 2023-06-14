import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Racer, Racer2DTO, RacerDTO } from 'src/app/shared/models/racer.model';
import { User } from 'src/app/shared/models/user.model';
import { RacersService } from 'src/app/shared/services/racers.service';
import { UsersService } from 'src/app/shared/services/users.service';

export interface EditField {
  name: string;
  title: string; 
  type: string; 
  list?: Observable<{value:number, label: string}[]>;
  date?: Date
}

@Component({
  selector: 'app-racers',
  templateUrl: './racers.component.html',
})

export class RacersComponent implements OnInit {

  racers$: Observable<Racer[]>;
  users$: Observable<User[]>
  selectedItems:  Racer[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: Racer;
  editedItems: RacerDTO[];

  fields = [
    {name: 'userId', title: 'userId', type: 'text' },
    {name: 'num', title: 'num', type: 'text' },
    {name: 'userFullName', title: 'userFullName', type: 'text' },
    {name: 'raceId', title: 'raceId', type: 'text' },
    {name: 'categoryId', title: 'categoryId', type: 'text' },
    {name: 'registrationDate', title: 'registrationDate', type: 'text' },
  ]

  editFields: EditField[];

  constructor(
    public racersService: RacersService,
    private usersService: UsersService,
  ) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.racers$ = this.racersService.get();
    this.editFields = [
      {name: 'id', title: 'id', type: 'text' },
      {name: 'userId', title: 'userId', type: 'list', list: this.usersService.get()
        .pipe(
          map(users => users
            .map(user => ({value: user.id, label: user.fullName}))
          )
        )},
      {name: 'raceId', title: 'raceId', type: 'text' },
      {name: 'categoryId', title: 'categoryId', type: 'text' },
      {name: 'regDate', title: 'regDate', type: 'date' },
      {name: 'num', title: 'num', type: 'text' },
    ]
  }

  saveRacer(item: RacerDTO) {
    this.racersService.save(item)
      .subscribe()    
  }

  addRacer(item: RacerDTO) {
    this.racersService.add(item)
      .subscribe()    
  }

  deleteRacer(id: number) {
    this.racersService.delete(id)
      .subscribe()    
  }

  item2DTO(racer: Racer) {
    return Racer2DTO(racer)
  }

}

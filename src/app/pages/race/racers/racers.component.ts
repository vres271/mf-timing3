import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';
import { Racer, Racer2DTO, RacerDTO } from 'src/app/shared/models/racer.model';
import { User } from 'src/app/shared/models/user.model';
import { RacersService } from 'src/app/shared/services/racers.service';

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
  ) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.racers$ = this.racersService.get();
  }

  openEditor(items: Item[]) {
    this.editedItems = (items as Racer[]).map(racer => Racer2DTO(racer));
  }

  copyRacer(item: Item) {
    this.racersService.add(item as RacerDTO)
      .subscribe()    
  }

  deleteRacer(id: number) {
    this.racersService.delete(id)
      .subscribe()    
  }

}

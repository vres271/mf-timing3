import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { Item } from 'src/app/shared/models/items.model';
import { Racer, Racer2DTO, RacerDTO } from 'src/app/shared/models/racer.model';
import { RacersService } from 'src/app/shared/services/racers.service';

@Component({
  selector: 'app-racers',
  templateUrl: './racers.component.html',
})

export class RacersComponent implements OnInit {

  racers$: Observable<Racer[]>;
  selectedItems:  Racer[] = [];
  fieldNames: string[];
  editedItems: RacerDTO[];

  fields = [
    // {name: 'userId', title: 'userId', type: 'text' },
    {name: 'num', title: 'num', type: 'text' },
    {name: 'userFullName', title: 'userFullName', type: 'text' },
    // {name: 'raceId', title: 'raceId', type: 'text' },
    {name: 'raceName', title: 'raceName', type: 'text' },
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

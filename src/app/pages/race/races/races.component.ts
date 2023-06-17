import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { Item } from 'src/app/shared/models/items.model';
import { Race, Race2DTO, RaceDTO } from 'src/app/shared/models/race.model';
import { RacesService } from 'src/app/shared/services/races.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races$: Observable<Race[]>;
  selectedItems:  Race[] = [];
  fieldNames: string[];
  editedItems: RaceDTO[];

  fields = [
    {name: 'name', title: 'name', type: 'text' },
    {name: 'startDateString', title: 'startDateString', type: 'text' },
    {name: 'raceType', title: 'raceType', type: 'text' },
  ]

  editFields: EditField[];

  constructor(
    public racesService: RacesService,
  ) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.races$ = this.racesService.get();
  }

  openEditor(items: Item[]) {
    this.editedItems = (items as Race[]).map(racer => Race2DTO(racer));
  }

  copyRace(item: Item) {
    this.racesService.add(item as RaceDTO)
      .subscribe()    
  }

  deleteRace(id: number) {
    this.racesService.delete(id)
      .subscribe()    
  }

}

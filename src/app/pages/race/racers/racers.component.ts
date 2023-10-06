import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { ItemsComponent } from 'src/app/shared/components/common/items/items.component';
import { Item } from 'src/app/shared/models/items.model';
import { Racer, RacerDTO } from 'src/app/shared/models/racer.model';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { RacersService } from 'src/app/shared/services/racers.service';

@Component({
  selector: 'app-racers',
  templateUrl: './racers.component.html',
})

export class RacersComponent extends ItemsComponent<Racer, RacerDTO> {

  override fields = [
    // {name: 'userId', title: 'userId', type: 'text' },
    {name: 'num', title: 'num', type: 'text' },
    {name: 'userFullName', title: 'userFullName', type: 'text' },
    // {name: 'raceId', title: 'raceId', type: 'text' },
    {name: 'raceName', title: 'raceName', type: 'text' },
    {name: 'raceTypeName', title: 'raceTypeName', type: 'text' },
    {name: 'categoryId', title: 'categoryId', type: 'text' },
    {name: 'registrationDate', title: 'registrationDate', type: 'text' },
  ]

  constructor(
    override itemsService: RacersService,
    override dataService: DataService,
  ) {
    super(
      itemsService, 
      dataService
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Racer } from 'src/app/shared/models/racer.model';
import { RacersService } from 'src/app/shared/services/racers.service';

@Component({
  selector: 'app-racers',
  templateUrl: './racers.component.html',
})
export class RacersComponent implements OnInit {

  racers$: Observable<Racer[]>;
  selectedItems:  Racer[];
  sidebarVisible: boolean;
  fieldNames: string[];

  fields = [
    {name: 'userId', title: 'userId', type: 'text' },
    {name: 'num', title: 'num', type: 'text' },
    {name: 'userFullName', title: 'userFullName', type: 'text' },
    {name: 'raceId', title: 'raceId', type: 'text' },
    {name: 'categoryId', title: 'categoryId', type: 'text' },
    {name: 'regDate', title: 'regDate', type: 'text' },
    {name: 'formatedDate', title: 'formatedDate', type: 'text' },
  ]

  constructor(private racersService: RacersService) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.racers$ = this.racersService.getRacers();
  }

  onRowSelect(e: any) {
    this.sidebarVisible = true;
  }

  onRowUnselect() {
    if (!this.selectedItems.length) {
      this.sidebarVisible = false
    }
  }

}

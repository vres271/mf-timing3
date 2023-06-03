import { Component, Input, OnInit } from '@angular/core';
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

export interface Field {
  name: string;
  title: string; 
  type: string; 
}

@Component({
  selector: 'app-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['./items-panel.component.css']
})
export class ItemsPanelComponent {

  @Input() items$: Observable<Racer[]>;
  @Input() fields: Field[];
  @Input() editFields: EditField[];

  racers$: Observable<Racer[]>;
  users$: Observable<User[]>
  selectedItems:  Racer[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: Racer;
  editedItems: RacerDTO[];

  constructor(
    private racersService: RacersService,
    private usersService: UsersService,
  ) {
    
  }

  ngOnInit() {
    this.racers$ = this.racersService.get();
    this.fieldNames = this.fields.map(f => f.name);
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

  onRowSelect(e: any) {
    // this.openEditor(this.selectedItems);
  }

  onRowUnselect() {
    if (!this.selectedItems.length) {
      this.closeEditor()
    }
  }

  openEditor(items?: Racer[]) {
    this.sidebarVisible = true;
    if (items) {
      this.editedItems = items.map(item => Racer2DTO(item))
    } else {
      this.editedItems = [<RacerDTO>{}];
      this.editedItems[0].id = 0;
    }
  }

  closeEditor() {
    this.sidebarVisible = false;
    this.editedItems = [];
    this.selectedItems = [];
  }

  save() {
    if(this.editedItems[0]?.id) {
      this.racersService.save(this.editedItems[0])
        .subscribe(res=> {
          this.closeEditor()
        })
    } else {
      this.racersService.add(this.editedItems[0])
        .subscribe(res=> {
          this.closeEditor()
        })

    }
  }

  delete(items: Racer[]) {
    this.racersService.delete(items[0].id)
      .subscribe(res=> {
        console.log('deleted', res);
        this.selectedItems = [];
        this.closeEditor()
      })
  }

  copy(items: Racer[]) {
    this.racersService.add({...items[0], id: 0})
      .subscribe(res=> {
        console.log('deleted', res);
      })

  }


}

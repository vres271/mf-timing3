import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { User, User2DTO, UserDTO } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {

  items$: Observable<User[]>;
  selectedItems:  User[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: User;
  editedItems: UserDTO[];

  fields = [
    {name: 'name', title: 'Логин', type: 'text' },
    {name: 'firstName', title: 'Имя', type: 'text' },
    {name: 'secondName', title: 'Фамилия', type: 'text' },
    {name: 'thirdName', title: 'Отчество', type: 'text' },
    {name: 'email', title: 'Email', type: 'text' },
    {name: 'active', title: 'Активен', type: 'boolean' },
  ]

  editFields: EditField[];

  constructor(
    private usersService: UsersService,
  ) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.items$ = this.usersService.get();
    this.editFields = [
      {name: 'name', title: 'Логин', type: 'text' },
      {name: 'firstName', title: 'Имя', type: 'text' },
      {name: 'secondName', title: 'Фамилия', type: 'text' },
      {name: 'thirdName', title: 'Отчество', type: 'text' },
      {name: 'email', title: 'Email', type: 'text' },
      {name: 'active', title: 'Активен', type: 'boolean' },
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

  openEditor(items?: User[]) {
    this.sidebarVisible = true;
    if (items) {
      this.editedItems = items.map(item => User2DTO(item))
    } else {
      this.editedItems = [<UserDTO>{}];
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
      this.usersService.save(this.editedItems[0])
        .subscribe(res=> {
          this.closeEditor()
        })
    } else {
      this.usersService.add(this.editedItems[0])
        .subscribe(res=> {
          this.closeEditor()
        })

    }
  }

  delete(items: User[]) {
    this.usersService.delete(items[0].id)
      .subscribe(res=> {
        console.log('deleted', res);
        this.selectedItems = [];
        this.closeEditor()
      })
  }

  copy(items: User[]) {
    this.usersService.add({...items[0], id: 0})
      .subscribe(res=> {
        console.log('deleted', res);
      })

  }


}

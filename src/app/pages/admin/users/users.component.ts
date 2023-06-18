import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { Item } from 'src/app/shared/models/items.model';
import { User, User2DTO, UserDTO } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  selectedItems:  User[] = [];
  fieldNames: string[];
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
    public usersService: UsersService,
  ) {
    this.fieldNames = this.fields.map(f => f.name);
  }

  ngOnInit() {
    this.users$ = this.usersService.get();
  }

  openEditor(items: Item[]) {
    this.editedItems = (items as User[]).map(user => User2DTO(user));
  }

  copyUser(item: Item) {
    this.usersService.add(item as UserDTO)
      .subscribe()    
  }

  deleteUser(id: number) {
    this.usersService.delete(id)
      .subscribe()    
  }

}

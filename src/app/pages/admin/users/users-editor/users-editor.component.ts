import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/items.model';

import { UsersService } from 'src/app/shared/services/users.service';
import { map } from 'rxjs';
import { UserDTO } from 'src/app/shared/models/user.model';
import { EditField } from 'src/app/shared/components/common/items-editor/items-editor.component';
import { RacesService } from 'src/app/shared/services/races.service';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
})
export class UsersEditorComponent implements OnInit  {

  @Input() items: Item[]

  editFields: EditField[];

  constructor(
    public usersService: UsersService,
  ) {
    
  }

  ngOnInit() {
    this.editFields = [
      {name: 'name', title: 'Логин', type: 'text' },
      {name: 'firstName', title: 'Имя', type: 'text' },
      {name: 'secondName', title: 'Фамилия', type: 'text' },
      {name: 'thirdName', title: 'Отчество', type: 'text' },
      {name: 'email', title: 'Email', type: 'text' },
      {name: 'active', title: 'Активен', type: 'boolean' },
    ]
  }

  save(dtos: UserDTO[]) {
    this.usersService.save(dtos)
      .subscribe()    
  }

  add(item: UserDTO) {
    this.usersService.add(item)
      .subscribe()    
  }

}

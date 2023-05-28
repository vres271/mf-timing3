import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  selectedItems:  User[];
  sidebarVisible: boolean;

  fields = [
    {name: 'name', title: 'Логин', type: 'text' },
    {name: 'firstName', title: 'Имя', type: 'text' },
    {name: 'secondName', title: 'Фамилия', type: 'text' },
    {name: 'thirdName', title: 'Отчество', type: 'text' },
    {name: 'email', title: 'Email', type: 'text' },
    {name: 'active', title: 'Активен', type: 'boolean' },
  ]

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

  onRowSelect(e: any) {
    // if(this.selectedItems.length===2 && e.data === this.selectedItems[0]) {
    //   this.sidebarVisible = false;
    // } else {
      this.sidebarVisible = true;
    // }
  }

  onRowUnselect() {
    console.log(1)
    if (!this.selectedItems.length) {
      this.sidebarVisible = false
    }
  }

}

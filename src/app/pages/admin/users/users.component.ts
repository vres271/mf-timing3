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

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

}

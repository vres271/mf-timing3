import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdminRoutingModule } from './admin-routing.module';

import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    MenuModule,
  ]
})
export class AdminModule { }

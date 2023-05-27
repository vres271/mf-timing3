import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdminRoutingModule } from './admin-routing.module';

import { MenuModule } from 'primeng/menu';
import { GeneralComponent } from './general/general.component';
import { MenuComponent } from './menu/menu.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    GeneralComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CardModule,
    MenuModule,
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }

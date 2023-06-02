import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AdminRoutingModule } from './admin-routing.module';

import { MenuModule } from 'primeng/menu';
import { GeneralComponent } from './general/general.component';
import { MenuComponent } from './menu/menu.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { DateTimeModule } from 'src/app/shared/components/controls/date-time/date-time.module';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    GeneralComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CardModule,
    MenuModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    InputSwitchModule,
    DropdownModule,
    DateTimeModule,
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }

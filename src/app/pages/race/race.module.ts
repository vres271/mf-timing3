import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceRoutingModule } from './race-routing.module';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { RacersComponent } from './racers/racers.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RaceComponent,
    RacersComponent,
  ],
  imports: [
    CommonModule,
    RaceRoutingModule,
    MenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    FormsModule,

  ]
})
export class RaceModule { }

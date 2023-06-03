import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsPanelComponent } from './items-panel.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { DateTimeModule } from '../../controls/date-time/date-time.module';



@NgModule({
  declarations: [
    ItemsPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    DropdownModule,
    DateTimeModule,
  ],
  exports: [
    ItemsPanelComponent
  ]
})
export class ItemsPanelModule { }

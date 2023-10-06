import { InputSwitchModule } from 'primeng/inputswitch';
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
import { ItemsPanelService } from './items-panel.service';
import { ItemsEditorComponent } from '../items-editor/items-editor.component';
import { ItemsEditorComponent2 } from '../items-editor2/items-editor2.component';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    ItemsPanelComponent,
    ItemsEditorComponent,
    ItemsEditorComponent2,
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
    InputSwitchModule,
    CalendarModule,
  ],
  providers: [
    ItemsPanelService
  ],
  exports: [
    ItemsPanelComponent,
    ItemsEditorComponent,
    ItemsEditorComponent2,
  ]
})
export class ItemsPanelModule { }

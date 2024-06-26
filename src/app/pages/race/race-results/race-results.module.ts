import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RaceResultsComponent } from './race-results.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [    
    RaceResultsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    RaceResultsComponent
  ]
})
export class RaceResultsModule { }

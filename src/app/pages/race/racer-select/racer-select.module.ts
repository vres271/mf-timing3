import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacerSelectComponent } from './racer-select.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [    
    RacerSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule
  ],
  exports: [
    RacerSelectComponent
  ]
})
export class RacerSelectModule { }

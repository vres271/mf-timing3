import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DateTimeComponent } from './date-time.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DateTimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,    
  ],
  exports: [
    DateTimeComponent
  ],

})
export class DateTimeModule { }

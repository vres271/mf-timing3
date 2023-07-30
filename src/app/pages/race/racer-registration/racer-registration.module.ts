import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacerRegistrationComponent } from './racer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [    
    RacerRegistrationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  exports: [
    RacerRegistrationComponent
  ]
})
export class RacerRegistrationModule { }

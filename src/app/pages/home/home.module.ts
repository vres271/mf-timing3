import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeService } from './home.service';
import { TableModule } from 'primeng/table';
import { HomeRoutingModule } from './home-routing.module';
import { VersionComponent } from './version/version.component';



@NgModule({
  declarations: [
    HomeComponent,
    VersionComponent
  ],
  providers: [
    HomeService
  ],
  imports: [
    CommonModule,
    TableModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

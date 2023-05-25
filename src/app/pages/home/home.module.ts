import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeService } from './home.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HomeRoutingModule } from './home-routing.module';
import { VersionComponent } from './version/version.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HomeComponent,
    VersionComponent,
    AboutComponent
  ],
  providers: [
    HomeService
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

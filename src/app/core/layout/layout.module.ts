import { TabMenuModule } from 'primeng/tabmenu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }

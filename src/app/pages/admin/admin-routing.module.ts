import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'general', component: AdminComponent},
  {path: 'drivers', component: AdminComponent},
  {path: 'users', component: AdminComponent},
  {path: 'serial', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
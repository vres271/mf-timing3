import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { GeneralComponent } from './general/general.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'general',
    component: AdminComponent
  },
  {
    path: 'users',
    component: AdminComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaceComponent } from './race.component';

const routes: Routes = [
  {
    path: '',
    component: RaceComponent
  },
  {
    path: 'timing/:raceId',
    component: RaceComponent
  },
  {
    path: 'racers',
    component: RaceComponent
  },
  {
    path: 'races',
    component: RaceComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceRoutingModule { }
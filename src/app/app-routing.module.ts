import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // { 
  //   path: 'home', 
  //   title: 'MFTiming3: Home', 
  //   component: HomeComponent 
  // },
  {
    path: 'lazy-home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

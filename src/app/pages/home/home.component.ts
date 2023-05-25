import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  hs: number = 0;
  products:any = [];

  constructor(private homeService: HomeService) {
    this.hs = this.homeService.getHS();
    for (let i = 0; i < 300; i++) {
      this.products.push({
        id: i+1,
        code: Math.floor(Math.random()*100000),
        name: 'Name Of Item ' + i,
        category: 'full',
        quantity: Math.random() > .5
      })      
    }

  }

}

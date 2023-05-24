import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  hs: number = 0;
  constructor(private homeService: HomeService) {
    this.hs = this.homeService.getHS()
  }

  products = [
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
    {code: '123',name: '123',category: '123',quantity: '123'},
  ]



}

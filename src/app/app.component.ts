import { Component , OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LogUpdateService } from './services/log-update-service.service';
import { CheckForUpdateService } from './services/check-for-update-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mf-timing3 App';

  constructor(
    private logUpdateService: LogUpdateService,
    private checkForUpdateService: CheckForUpdateService,
  ) {}

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

  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
    { label: 'Documentation', icon: 'pi pi-fw pi-file' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' }
  ];
  activeItem = this.items[2];

  ngOnInit() {
    
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'date-time-control',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit{

  dtValue: Date;
  @Input()
  get dt() {
    return this.dtValue;
  }

  @Output() dtChange = new EventEmitter();

  set dt(val) {
    if(typeof val === 'number') {
      this.dtValue = new Date(val);
    } else {
      this.dtValue = val;
    }
    this.dtChange.emit(this.dtValue);
  } 

  ngOnInit() {
    
  }
  
}

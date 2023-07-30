import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';
import { Race } from 'src/app/shared/models/race.model';
import { Racer } from 'src/app/shared/models/racer.model';
import { RacersService } from 'src/app/shared/services/racers.service';

@Component({
  selector: 'app-racer-select',
  templateUrl: './racer-select.component.html',
  styleUrls: ['./racer-select.component.css']
})
export class RacerSelectComponent implements OnInit{
  @Input() race: Race | undefined;
  @Output() onRegisterRacerClick = new EventEmitter();
  @Output() onRacerSelect = new EventEmitter<Racer>();
  @Output() onClose = new EventEmitter();
  subs: Subscription[] = [];
  racers: Racer[] | undefined;
  selectedRacer!: Racer

  constructor(
    private racersService: RacersService,
  ) { }

  ngOnInit() {
    this.subs.push(this.racersService.get().subscribe(
      racers => {
        this.racers = racers;
      }
    ))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  filter(items: Item[], cond: any):Item[] {
    const [key, value] = Object.entries(cond)[0];
    return items.filter((item:any) => item[key] === value)
  }

  selectRacer(e: any) {
    this.onRacerSelect.emit(e.data as Racer);
    this.close();
  }

  openRegisterRacerForm() {
    this.onRegisterRacerClick.emit();
  }

  close() {
    this.onClose.emit();
  }

}

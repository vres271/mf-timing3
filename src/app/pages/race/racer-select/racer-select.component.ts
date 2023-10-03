import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable, map } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';
import { Race } from 'src/app/shared/models/race.model';
import { Racer } from 'src/app/shared/models/racer.model';
import { RacersService } from 'src/app/shared/services/racers.service';

@Component({
  selector: 'app-racer-select',
  templateUrl: './racer-select.component.html',
  styleUrls: ['./racer-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacerSelectComponent implements OnInit{
  @Input() race: Race | undefined;
  @Output() onRegisterRacerClick = new EventEmitter();
  @Output() onRacerSelect = new EventEmitter<Racer>();
  @Output() onClose = new EventEmitter();
  subs: Subscription[] = [];
  racers$: Observable<Racer[]>;
  selectedRacer!: Racer

  constructor(
    private cd: ChangeDetectorRef,
    private racersService: RacersService,
  ) { }

  ngOnInit() {
    this.racers$ = this.racersService.get().pipe(
      map(racers => racers.filter(racer => racer.race.id === this.race?.id))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
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

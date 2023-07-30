import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceEvent, RaceEventType } from 'src/app/shared/models/race-event.model';
import { Race } from 'src/app/shared/models/race.model';
import { RaceEventsService } from 'src/app/shared/services/race-events.service';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css']
})
export class RaceResultsComponent  implements OnInit{
  @Input() race: Race | undefined;

  subs: Subscription[] = [];
  raceEvents: RaceEvent[];
  results: {
    bestFinish: RaceEvent[],
    bestLap: RaceEvent[],
  } = {
    bestFinish: [],
    bestLap: [],
  }

  constructor(
    private raceEventsService: RaceEventsService,
  ) { }

  ngOnInit() {
    this.subs.push(this.raceEventsService.get()
    .subscribe(raceEvents => {
      this.raceEvents = raceEvents.filter(e => e.raceId === this.race?.id)
      this.calcResults();
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  calcResults() {
    let min: any = {};
    this.results.bestFinish = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Finish)
        .sort((a,b) => a.dt - b.dt)
        .filter(item => {
          if (min[item.racerNum] === undefined) {
            min[item.racerNum] = true;
            return true;
          } else {
            return false;
          }
        })
    min = {}
    this.results.bestLap = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Point)
        .sort((a,b) => a.dt - b.dt)
        .filter(item => {
          if (min[item.racerNum] === undefined) {
            min[item.racerNum] = true;
            return true;
          } else {
            return false;
          }
        })
  }

}

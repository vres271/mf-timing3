import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, forkJoin, switchMap } from 'rxjs';
import { RaceEvent, RaceEventType } from 'src/app/shared/models/race-event.model';
import { Race } from 'src/app/shared/models/race.model';
import { Racer } from 'src/app/shared/models/racer.model';
import { RaceEventsService } from 'src/app/shared/services/race-events.service';
import { RacersService } from 'src/app/shared/services/racers.service';
import { RacesService } from 'src/app/shared/services/races.service';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceResultsComponent  implements OnInit{
  @Input() race: Race | undefined;
  @Output() modeChange = new EventEmitter<boolean>();

  subs: Subscription[] = [];
  raceEvents: RaceEvent[];
  results: {
    bestFinish: RaceEvent[],
    bestLap: RaceEvent[],
    full: any[],
  } = {
    bestFinish: [],
    bestLap: [],
    full: [],
  }

  constructor(
    private raceEventsService: RaceEventsService,
    private racesService: RacesService,
    private racersService: RacersService,
  ) { }

  ngOnInit() {
    this.subs.push(this.raceEventsService.get()
    .subscribe(raceEvents => {
      this.raceEvents = raceEvents.filter(e => e.raceId === this.race?.id)
      this.calcResults();
    }))
    this.modeChange.emit(false);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  tabChange(e: {index: number}) {
    this.modeChange.emit(e?.index === 2);
  }

  calcResults() {
    let min: any = {};
    const filterBest = (item: RaceEvent) => {
      if (min[item.racerNum] === undefined) {
        min[item.racerNum] = true;
        return true;
      } else {
        return false;
      }
    }

    this.results.bestFinish = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Finish)
        .sort((a,b) => a.dt - b.dt)
        .filter(filterBest)

    min = {}
    this.results.bestLap = this.raceEvents
        .filter(item => item.raceEventType === RaceEventType.Point)
        .sort((a,b) => a.dt - b.dt)
        .filter(filterBest)

    min = {}
    this.results.full = this.raceEvents
      .filter(item => item.raceEventType === RaceEventType.Finish)
      .sort((a,b) => a.dt - b.dt)
      .filter(filterBest)
      .map((re, i) => {
        return {
          place: i + 1,
          racerNum: re.racerNum,
          racerName: re.racerName,
          bestTime: re.dt,
          bestTimeString: re.dtString,
          attempts: this.raceEvents
            .filter(afe => afe.raceEventType === RaceEventType.Finish && afe.racer === re.racer)
            .sort((a,b) => a.date - b.date)
            .map((afe, j) => {
              const atemptsEvents = this.raceEvents
                .filter(x => x.racer === re.racer)
                .sort((a,b) => a.id - b.id)
              const afeIndex = atemptsEvents.findIndex(x => x === afe);
              let ase: RaceEvent | undefined = undefined;
              for (let l = afeIndex; l >= 0; l--) {
                if (atemptsEvents[l].raceEventType === RaceEventType.Start) {
                  ase = atemptsEvents[l];
                  break;
                }
              }
              return {
                num: j + 1,
                time: afe.dt,
                timeString: afe.dtString,
                date: afe.date,
                dateString: afe.dateString,
                isBestAtempt: afe === re,
                laps: ase ? this.raceEvents
                  .filter(lre => (lre.raceEventType === RaceEventType.Point ) && lre.racer === re.racer && lre.id < afe.id && ase && lre.id > ase?.id)
                  .sort((a,b) => b.id - a.id)
                  .map((lre, k) => {
                    return {
                      lapNum: k + 1,
                      time: lre.dt,
                      timeString: lre.dtString,
                      id: lre.id,
                      date: lre.date,
                      dateString: lre.dateString,
                    }
                  }) : []
              }
            })
        }
      })
      console.log(this.results.full);
    
  }


  // Временный говнокод

  private generateEvent(racer: Racer, race: Race, raceEventType: RaceEventType, dt: number) {
    return this.raceEventsService.add({
      id: 0,
      date: new Date().getTime(),
      dt,
      raceEventType,
      raceId: race?.id || 0,
      racerId: racer.id,
      detail: {cmd_racer: racer.num},
    });
  }

  generateData() {
    this.racesService.get().subscribe(res => {
      const race = res.find(race => race.name === 'LCPF - Левобережный ПампФест') as Race;
      this.racersService.get().subscribe(res => {
        const racers = res.filter(racer => racer.race === race);

        let i = 0;
        const generateDt = () => {
          return 9000 + Math.round(7000*Math.random());
        }
        while (++i <= 50) {
          const racer = racers[Math.round((racers.length - 1) * Math.random())];

          let sumT = 0;
          let t = 0;
          this.generateEvent(racer, race, RaceEventType.Start, t).subscribe();
          t = generateDt();
          sumT += t;
          this.generateEvent(racer, race, RaceEventType.Point, t).subscribe();
          t = generateDt();
          sumT += t;
          this.generateEvent(racer, race, RaceEventType.Point, t).subscribe();
          t = generateDt();
          sumT += t;
          this.generateEvent(racer, race, RaceEventType.Point, t).subscribe();
          t = generateDt();
          sumT += t;
          this.generateEvent(racer, race, RaceEventType.Finish, sumT).subscribe();
        };
      });
    });
  }

}

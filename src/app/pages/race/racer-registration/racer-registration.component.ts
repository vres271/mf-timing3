import { Component, EventEmitter, Output, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Race } from 'src/app/shared/models/race.model';
import { Racer, RacerDTO } from 'src/app/shared/models/racer.model';
import { UserDTO } from 'src/app/shared/models/user.model';
import { RacersService } from 'src/app/shared/services/racers.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-racer-registration',
  templateUrl: './racer-registration.component.html',
  styleUrls: ['./racer-registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RacerRegistrationComponent implements OnInit{

  @Output() onClose = new EventEmitter();
  @Input() race: Race | undefined;
  subs: Subscription[] = [];

  racers: Racer[] | undefined;
  registerNewRacerError = '';
  newRacer = {
    num:0,
    firstName:'',
    secondName:'',
    thirdName:'' ,
  };

  constructor(
    private racersService: RacersService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.subs.push(this.racersService.get().subscribe(
      racers => {
        this.racers = racers;
        this.newRacer = {
          num: (this.racers?.filter(racer => racer.raceId === this.race?.id).reduce((p, v) =>  ( p.num > v.num ? p : v )).num  || 0) + 1,
          firstName:'',
          secondName:'',
          thirdName:'' ,  
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  validateNewRacerNum() {
    this.registerNewRacerError = '';
    const existedRacer = this.racers?.find(racer => +this.newRacer?.num === +racer.num )
    if (existedRacer) {
      this.registerNewRacerError = `Racer Number already exists: ${existedRacer.userName || '-'}`;
    }
  }

  registerNewRacer() {
    const user: UserDTO =  {
      id: 0,
      name: '',
      firstName: this.newRacer.firstName,
      secondName: this.newRacer.secondName,
      thirdName: this.newRacer.thirdName,
      email: '',
      active: true,
    }
    this.subs.push(
    this.usersService.add(user)
      .pipe(
        switchMap(createdUser => {
          const racer: RacerDTO = {
            id: 0,
            userId: createdUser.id,
            raceId: this.race?.id || 0,
            categoryId: 0,
            regDate: new Date().getTime(),
            num: +this.newRacer.num,
          }
          return this.racersService.add(racer)
        })
      )
      .subscribe(createdRacer => {
        if(createdRacer?.id) {
          console.log('New Racer Created', createdRacer);
          this.close();
        } else {
          console.warn('Error creating Racer', createdRacer);
        }
      }))
  }

  close() {
    this.onClose.emit();
  }

}

import { Component, EventEmitter, Output, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  registerRacerForm = this.fb.group({
    num: [0, [Validators.required, this.racerNumExistsValidator()]],
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    thirdName: [''],
  });

  constructor(
    private racersService: RacersService,
    private usersService: UsersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.subs.push(this.racersService.get().subscribe(
      racers => {
        this.racers = racers;
        this.registerRacerForm.patchValue({
          num: (this.racers?.filter(racer => racer.race.id === this.race?.id).reduce((p, v) =>  ( p.num > v.num ? p : v )).num  || 0) + 1
        })
      }
    ))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  racerNumExistsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const existedRacer = this.racers?.find(racer => +control.value === +racer.num );
      return existedRacer ?  {racerNumExists:  `Racer Number already exists: ${existedRacer.userName || '-'}`} : null
    }
  }

  registerNewRacer() {
    const user: UserDTO =  {
      id: 0,
      name: '',
      firstName: this.registerRacerForm.value.firstName || '',
      secondName: this.registerRacerForm.value.secondName || '',
      thirdName: this.registerRacerForm.value.thirdName || '',
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
            num: + (this.registerRacerForm.value.num || 0),
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

  get numErrors() {
    return this.registerRacerForm.get('num')?.errors
  }

  close() {
    this.onClose.emit();
  }

}

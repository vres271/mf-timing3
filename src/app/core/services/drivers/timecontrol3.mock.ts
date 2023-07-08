import { Injectable } from '@angular/core';
import { SerialService } from 'src/app/core/services/drivers/serial.service';
import { LogItemsService } from '../../../shared/services/log-items.service';
import { DriverConnectionState } from './driver.service';

export enum MenuState {
    MainMenu,
    Race,
}

export enum RaceState {
    StandBy,
    Ready,
    Started
}

@Injectable({
    providedIn: 'root'
})
export class Timecontrol3MockService extends SerialService{
    override id = 3;
    override name = 'Timecontrol3 Serial Port Emulator';
  
    constructor(logItemsService: LogItemsService) { 
        super(logItemsService)
        console.info('Using Timecontroll3 Mock Service')
    }

    menuState: MenuState = MenuState.MainMenu;
    raceState: RaceState = RaceState.StandBy;
    racer = 0;
    laps = 4;
    startTime: number = 0;
    lapTimes: number[] = [];
    connected = false;
    bootTime = 0;

    response(command:string, values:any[] = []) {
        this.outputStream$.next(`api ${command} ${values.join(' ')}`);
    }

    override connect() {

        console.log('Timecontroll3 Mock starting...')
        this.connected = true;
        setTimeout(()=>{
            this.bootTime = new Date().getTime();
            this.response('connect_timecontrol3');
            super.startLogging();
            this.connectionState = DriverConnectionState.Connected;
        },1000)

        this.subs.push(this.inputStream$.subscribe(message => {
            console.log('this.inputStream$', message);
            this.send(message);
        }));

    }

    get time():number {
        return new Date().getTime() - this.bootTime;
    }

    override send(message: string) {
        const splitted = message.trim().replace(';', '').replace('\n', '').replace('\r', '').split(' ');
        const cmd = splitted[0];
        const values = splitted.splice(1);
        if(cmd) {
            if (cmd === 'set_ready') {
                if (this.raceState !== RaceState.Started) {
                    this.menuState = MenuState.Race;
                    this.raceState = RaceState.Ready;
                    this.response('ready',[this.racer, this.time, this.laps])
                }
            } else if (cmd === '^') {
                if (this.raceState !== RaceState.Started) {
                    this.menuState = this.menuState === MenuState.MainMenu ? MenuState.Race : MenuState.MainMenu;
                    this.raceState = this.raceState === RaceState.StandBy ? RaceState.Ready : RaceState.StandBy;
                    this.response('in_menu',[this.racer, this.time])
                }
            } else if (cmd === 'set_racer') {
                if (this.menuState === MenuState.Race && this.raceState === RaceState.Ready) {
                    this.racer = +values[0];
                    this.response('set_racer',[this.racer, this.time])
                }
            }
        }        
    }

    emitSensorEvent() {
        if (this.menuState === MenuState.Race) {
            if (this.raceState === RaceState.Ready) {
                this.lapTimes = [];
                this.startTime = this.time;
                this.raceState = RaceState.Started;
                this.response('start',[this.racer, 0]);
                return;
            }
            if (this.raceState === RaceState.Started) {
                const lapTime = this.time - this.lapTimes?.[this.lapTimes.length-1] || this.time - this.startTime;
                this.lapTimes.push(this.time);
                this.response('lap',[this.racer, lapTime])
                if (this.lapTimes.length >= this.laps) {
                    this.raceState = RaceState.Ready;
                    this.response('finish',[this.racer, this.time - this.startTime]);
                }
                return;
            }
        }
    }

}
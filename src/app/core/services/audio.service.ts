import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private path = '../../../assets/sounds/';
  public mute = false;

  constructor() { }

  playFile(fileName: string, delay: number = 0, volume: number = 1): void {
    if (this.mute) {
        return;
    }
    setTimeout(() => {
        const audio = new Audio();
        audio.volume = volume;
        audio.src = this.path+fileName;
        audio.load();
        audio.play();
    }, delay)
  }

}
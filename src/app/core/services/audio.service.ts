import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // Абсолютный путь от корня домена
  private basePath = '/assets/sounds/'; 
  public mute = false;

  // Трекинг активных звуков и таймаутов для возможности их отмены
  private activeAudios: HTMLAudioElement[] = [];
  private activeTimeouts: number[] = [];

  constructor() { }

  /**
   * @param fileName Имя файла
   * @param delay Задержка в мс
   * @param volume Громкость 0-1
   * @param isVoice Если true, прерывает предыдущие голосовые звуки (чтобы не было каши)
   */
  playFile(fileName: string, delay: number = 0, volume: number = 1, isVoice: boolean = false): void {
    if (this.mute) return;

    const timeoutId = window.setTimeout(() => {
      this.removeTimeout(timeoutId);

      // Если это голосовое объявление, прерываем предыдущие голосовые
      if (isVoice) {
        this.stopVoice();
      }

      const audio = new Audio();
      audio.volume = volume;
      audio.src = `${this.basePath}${fileName}`;
      // Помечаем тип звука для управления
      audio.dataset['type'] = isVoice ? 'voice' : 'sfx'; 

      this.activeAudios.push(audio);

      // Очищаем память после окончания воспроизведения
      audio.addEventListener('ended', () => this.removeAudio(audio));
      audio.addEventListener('error', () => this.removeAudio(audio));

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Браузер может заблокировать автоплей, если не было клика пользователя
          console.warn(`Не удалось воспроизвести ${fileName}:`, error.message);
          this.removeAudio(audio);
        });
      }
    }, delay);

    this.activeTimeouts.push(timeoutId);
  }

  // Останавливает всё: и звуки, и очищает очередь таймаутов
  stopAll() {
    this.clearPending();
    this.activeAudios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.activeAudios = [];
  }

  // Очищает только очередь (таймауты), но дает текущим звукам доиграться
  clearPending() {
    this.activeTimeouts.forEach(id => clearTimeout(id));
    this.activeTimeouts = [];
  }

  private stopVoice() {
    const voiceAudios = this.activeAudios.filter(a => a.dataset['type'] === 'voice');
    voiceAudios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      this.removeAudio(audio);
    });
  }

  private removeAudio(audio: HTMLAudioElement) {
    const index = this.activeAudios.indexOf(audio);
    if (index > -1) this.activeAudios.splice(index, 1);
  }

  private removeTimeout(id: number) {
    const index = this.activeTimeouts.indexOf(id);
    if (index > -1) this.activeTimeouts.splice(index, 1);
  }

  // ВАЖНО: Метод для "разблокировки" звука в браузере.
  // Должен быть вызван по первому клику пользователя в интерфейсе.
  unlockAudioContext() {
    const audio = new Audio();
    audio.muted = true;
    audio.play().then(() => {
      audio.pause();
    }).catch(() => {});
  }
}
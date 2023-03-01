import { Component, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bank = [];

  play: any = [];
  volume: number = 100;

  sounds: any[] = [
    { name: 'Bass Drum', path: 'https://cdn.pixabay.com/audio/2022/03/29/audio_bfd22271ec.mp3', volume: 1 },
    { name: 'Drum', path: 'https://cdn.pixabay.com/audio/2022/03/24/audio_fd91e184a5.mp3', volume: 1 },
    {name: 'Rain', path: 'https://cdn.pixabay.com/audio/2022/05/17/audio_28d2030bd4.mp3', volume: 1},
    {name: 'Lo-Fi One', path: 'https://cdn.pixabay.com/audio/2022/02/07/audio_c020718f4c.mp3', volume: 1}
  ];
  constructor() {}

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }
    return `${value}`;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    console.log(this.play);
  }

  setVolume(sound: any) {
    sound.volume = this.volume / 100;
    this.playSound(sound);
  }

  stopAll() {
    this.play.forEach((playSound) => {
      this.bank.forEach((item) => {
        if (item.src === playSound.path) {
          console.log(item);
          item.pause();
          this.addSound(playSound);
        }
      });
    });

    this.play.splice(0, this.play.length);
    this.bank.splice(0, this.bank.length);
  }

  addSound(sound) {
    console.log(this.sounds.indexOf(sound));
    if (this.sounds.indexOf(sound) === -1) {
      this.sounds.push(sound);
    }
    console.log(this.sounds);
  }

  stopAudio(sound) {
    this.bank.forEach((item) => {
      console.log(item.src);
      if (item.src === sound.path) {
        console.log(item);
        item.pause();
      }
      this.bank.indexOf(item);
      this.bank.splice(this.bank.indexOf(item), 1);
      this.play.indexOf(sound);
      this.play.splice(this.play.indexOf(sound), 1);
      this.sounds.push(sound);
    });
  }

  playSound(sound) {
    let audio = new Audio();
    audio.src = sound.path;
    audio.volume = sound.volume;
    audio.loop = true;
    audio.load();

    this.bank.forEach((item) => {
      if (item.src === sound.path) {
        item.pause();
      }
    });

    audio.play();
    this.bank.push(audio);
  }

  ngOnInit(): void {}
}

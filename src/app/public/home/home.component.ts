import { Component, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NewSoundFormComponent } from 'src/app/new-sound-form/new-sound-form.component';

export interface SoundModel {
  name: string;
  path: string;
  playing?: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  playSection: any[] = [];
  playingSounds: any[] = [];
  volume: number = 100;

  soundsBank: SoundModel[] = [
    { name: 'Bass Drum', path: 'https://cdn.pixabay.com/audio/2022/03/29/audio_bfd22271ec.mp3' },
    { name: 'Drum', path: 'https://cdn.pixabay.com/audio/2022/03/24/audio_fd91e184a5.mp3' },
    { name: 'Rain', path: 'https://cdn.pixabay.com/audio/2022/05/17/audio_28d2030bd4.mp3' },
    { name: 'Lo-Fi One', path: 'https://cdn.pixabay.com/audio/2022/02/07/audio_c020718f4c.mp3' }
  ];
  constructor(public dialog: MatDialog) {}

  drop(event: CdkDragDrop<SoundModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  playAudio(sound: SoundModel) {
    let audio = new Audio();
    audio.src = sound.path;
    audio.loop = true;
    audio.load();

    let duplicate = this.playingSounds.find((item) => item.src === audio.src);
    console.log(duplicate);
    if (duplicate !== undefined) return;

    sound.playing = true;
    audio.play();
    this.playingSounds.push(audio);
  }

  stopAudio(sound: SoundModel) {
    console.log(sound);
    console.log(this.playingSounds);
    let audio = this.playingSounds.find((item) => item.src === sound.path);
    if (audio !== undefined) {
      audio.pause();
      audio.currentTime = 0;
      sound.playing = false;
      //this.playSection.splice(this.playingSounds.indexOf(sound), 1);
      this.playingSounds.splice(this.playSection.indexOf(sound), 1);
      this.playSection.splice(this.playingSounds.indexOf(sound), 1);
      this.soundsBank.push(sound);
    }
  }

  stopAll() {
    this.playingSounds.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.playingSounds = [];
    this.playSection.forEach((sound) => (sound.playing = false));
    this.playSection = [];
  }

  addSound(){
    const dialogRef = this.dialog.open(NewSoundFormComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}

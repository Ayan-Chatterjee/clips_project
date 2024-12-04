import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  constructor(private storage: AngularFireStorage) {}

  title = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title: this.title
  })

  storeFile($event: Event){
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if(!this.file || this.file.type !== 'video/mp4'){
      this.file = null;
      alert('Please upload a valid MP4 video file');
      return;
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/,'')
    )
    this.nextStep = true;
  }

  uploadFile(){
    const clipFileName = uuid()
    const clipPath = `clips/${this.file?.name}.mp4`;
    this.storage.upload(clipPath,this.file,);
  }
}

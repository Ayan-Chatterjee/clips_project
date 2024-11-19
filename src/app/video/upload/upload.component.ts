import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  storeFile($event: Event){
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if(!this.file || this.file.type !== 'video/mp4'){
      this.file = null;
      alert('Please upload a valid MP4 video file');
      return;
    }
    this.nextStep = true;
  }
}

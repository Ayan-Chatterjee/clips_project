import { Component, Input, OnInit,ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
 // providers: [ModalService]  // Add this to your modal component to make it available globally.
})
export class ModalComponent implements OnInit {
  @Input() modalId = ''
  constructor(public modal: ModalService,public el : ElementRef){
    //console.log(this.modal.visible);
    // console.log(this.el);
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  //  console.log(this.el.nativeElement);
  //  document.body.appendChild(this.el.nativeElement);
  }
  closeModal()
  {
    this.modal.toggleModal(this.modalId);
  }

}

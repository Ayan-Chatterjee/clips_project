import { Component, Input, OnInit,ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
 // providers: [ModalService]  // Add this to your modal component to make it available globally.
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId = ''
  constructor(public modal: ModalService,public el : ElementRef,private renderer: Renderer2){
    //console.log(this.modal.visible);
    // console.log(this.el);
  }

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  //  console.log(this.el.nativeElement);
    //document.body.appendChild(this.el.nativeElement);
  }
 
  closeModal()
  {
    this.modal.toggleModal(this.modalId);
  }
  ngOnDestroy(): void {
    // console.log(this.el.nativeElement);
   //document.body.removeChild(this.el.nativeElement); 
  //  this.renderer.removeChild(document.body, this.el.nativeElement);
  // console.log("Closing modal ...")
  this.closeModal()
  }

}

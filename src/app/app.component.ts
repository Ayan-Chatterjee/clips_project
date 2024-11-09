import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   title = 'clips';

   // Memory Leak 
  // showModal = false;
  // constructor(public modal: ModalService) {}
  // ngOnInit() {
  //   setInterval(() =>{
  //     this.showModal = !this.showModal
  //     console.log(this.modal.modals)
  //   }
  //   ,1000);
  // }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../services/modal.service';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent
  ],
  providers: [
    ModalService,
    provideNgxMask()
  ]
})
export class SharedModule { }

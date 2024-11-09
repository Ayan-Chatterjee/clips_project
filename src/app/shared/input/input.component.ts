import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() control = new FormControl();
  ngOnInit() : void{
    console.log("Control: ",this.control.value);
  }

}

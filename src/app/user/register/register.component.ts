import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  email = new FormControl('');
  age = new FormControl('');
  password = new FormControl('');
  confirm_Password = new FormControl('');
  phoneNumber = new FormControl('');

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_Password: this.confirm_Password,
    phoneNumber: this.phoneNumber,
  });
}

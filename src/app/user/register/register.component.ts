import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  /**
   *
   */
  constructor( 
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}
  inSubmission = false;
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]
  );
  age = new FormControl('',[
    Validators.required,
    Validators.min(18),
    Validators.max(100),
  ]);
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_Password = new FormControl('',[
    Validators.required
  ]);
  phoneNumber = new FormControl('',
    [
      Validators.required,
      Validators.minLength(10)
    ]

  );

  showAlert = false;
  alertMsg = 'Please wait!';
  alertcolor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_Password: this.confirm_Password,
    phoneNumber: this.phoneNumber,
  });

  async register(){
    this.showAlert = true;
    this.alertMsg = 'Please wait!';
    this.alertcolor = 'blue';
    this.inSubmission = true;
    // console.log("color: ",this.alertcolor)
    const {email, password} = this.registerForm.value;
    try{
    const userCred = await this.auth.createUserWithEmailAndPassword(
      email as string, 
      password as string
    )
    await this.db.collection('users').add({
      name: this.name.value,
      email: this.email.value,
      age: this.age.value,
      phoneNumber: this.phoneNumber.value
    })
  }catch(e){
      console.log("Error Logged: ",e);
      this.alertMsg = 'An unexpected error occurred! please try again later.';
      this.alertcolor ='red';
      this.inSubmission = false;
      return
    }

    this.alertMsg = "Success! Your account has been created"
    this.alertcolor ='green';
  }
}

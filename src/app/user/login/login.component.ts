import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email:'',
    password:''
  }
  showAlert = false;
  aleartMsg = 'Please wait! We are logging you in ';
  alertColor = 'blue';
  inSubmission = false;
  constructor(private auth: AngularFireAuth){}

   async login()
  {
    this.showAlert = true;
    this.aleartMsg = 'Please wait! We are logging you in ';
    this.alertColor = 'blue';
    this.inSubmission = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, 
        this.credentials.password
      )
    } catch (error) {
      this.inSubmission = false;
      this.aleartMsg = 'Error occured Please try again';
      this.alertColor = 'red';
      console.error(error);
      return;
    }
    this.aleartMsg = 'Success! You are now logged in'
    this.alertColor = 'green';
  }
}

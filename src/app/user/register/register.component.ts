import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

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
  private auth: AuthService,
  private emailTaken: EmailTaken
  ) {}

  inSubmission = false;
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    (x)=>this.emailTaken.validate(x) //this is right
  );
  
  age = new FormControl<number| null>(null,[
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
  },[RegisterValidators.match('password','confirm_Password')]);

  async register(){
    this.showAlert = true;
    this.alertMsg = 'Please wait!';
    this.alertcolor = 'blue';
    this.inSubmission = true;
    // console.log("color: ",this.alertcolor)
    try{
      await this.auth.createsUser(this.registerForm.value as IUser);
      
    
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

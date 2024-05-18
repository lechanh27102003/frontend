import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  isSignUpActive: boolean = false;
  token: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toast: NgToastService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (response) => {
        this.toast.success({detail:"SUCCESS",summary:'User registered successfully',duration:5000});
      },
      (error) => {
        this.toast.error({detail:"ERROR",summary:'Error registering user: ' + error.error.message,sticky:true});
      }
    );
  }

  signIn() {
    this.authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        this.toast.success({detail:"SUCCESS",summary:'Login successfully',duration:5000});
        this.token = response.token; 
        const redirectUrl = response.redirectUrl;
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        } else {
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.toast.error({detail:"ERROR",summary:'Error logging in: ' + error.error.message,sticky:true});
      }
    );
  }
  toggleForm(isSignUp: boolean) {
    this.isSignUpActive = isSignUp;
  }
}
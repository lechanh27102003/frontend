import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  standalone : true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm ! : FormGroup;
  fb = inject (FormBuilder);
  authService = inject(AuthService);
  constructor(
    private toast: NgToastService ,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.forgetForm = this.fb.group ({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }
  cancel() {
    this.location.back(); 
  }
  submit (){
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next:(res) => {
        this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
        this.forgetForm.reset();
    },
    error: (err) => {
      this.toast.error({detail:"ERROR",summary:err.error.message,sticky:true});
    }
  })
  }
  
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { confirmPasswordValidator } from '../../../validators/confirm-password.validator';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ResetComponent implements OnInit {

resetForm!: FormGroup;
fb = inject(FormBuilder);
activatedRoute = inject(ActivatedRoute);
router = inject(Router);
authService = inject(AuthService);
constructor(
  private toast: NgToastService 
) { }

token!:string;
ngOnInit(): void {
  this.resetForm = this.fb.group({
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  },
  {
    validator: confirmPasswordValidator('password','confirmPassword')
  }
)
  this.activatedRoute.params.subscribe(val => {
    this.token = val['token'];
    console.log(this.token);
  })
}

reset() {
  let resetObj = {
    token: this.token,
    password: this.resetForm.value.password
  }
  this.authService.resetPasswordService(resetObj)
  .subscribe({
    next:(res) => {
      this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
      this.resetForm.reset();
      this.router.navigate(['/login']);
  },
  error: (err) => {
    this.toast.error({detail:"ERROR",summary:err.error.message,sticky:true});
  }
})

}
}



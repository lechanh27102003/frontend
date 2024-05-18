// user-detail.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../../../service/client-service/upload.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user: any = {};
  selectedAvatarFile: File | null = null;
  uploadForm: FormGroup;
  userId: string = '';
  selectedFileName: string = '';

  constructor(
    private authService: AuthService,
    private uploadService: UploadService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService 
  ) {
    this.uploadForm = this.fb.group({
      profilePicture: [''] 
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user._id;
      this.authService.getUserById(this.userId).subscribe(
        (userData) => {
          this.user = {
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
            email: userData.email,
            profilePicture: userData.profilePicture 
          };
        },
        (error) => {
          console.error('Error fetching user info:', error);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.toast.error({detail:"ERROR",summary:'User is not logged in.',sticky:true});
      this.router.navigate(['/login']);
    }
  }
  

  updateUser() {
    const userData = {
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      email: this.user.email,
      profilePicture: this.user.profilePicture
    };

    this.uploadService.updateUser(this.userId, userData).subscribe(
      (data) => {
        console.log('User info updated:', data);
        this.toast.success({detail:"SUCCESS",summary:'User info updated successfully.',duration:5000});
        this.reloadUser(); 
      },
      (error) => {
        this.toast.error({detail:"ERROR",summary:'Error updating user info:'+ error,sticky:true});
      }
    );
  }

  reloadUser() {
    this.loadCurrentUser(); // Reload user info
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Đảm bảo route không được sử dụng lại
    this.router.navigate([this.router.url]); // Navigate lại trang hiện tại
  }

  onFileSelected(event: any) {
    this.selectedAvatarFile = event.target.files[0] || null;
    if (this.selectedAvatarFile) {
      this.uploadForm.get('profilePicture')?.setValue(this.selectedAvatarFile); // Cập nhật giá trị cho uploadForm
    }
  }

  uploadAvatar() {
    if (!this.selectedAvatarFile) {
      this.toast.error({detail:"ERROR",summary:'No file selected',sticky:true});
      return;
    }
  
    this.uploadService.uploadAvatar(this.userId, this.selectedAvatarFile).subscribe(
      (imagePath: string | undefined) => {
        console.log('Server Response:', imagePath); 
        if (imagePath) {
          console.log('Avatar uploaded:', imagePath);
          this.user.profilePicture = imagePath;
          this.reloadUser();
        } else {
          this.toast.error({detail:"ERROR",summary:'Error uploading avatar',sticky:true});
        }
      },
      (error: any) => {
        this.toast.error({detail:"ERROR",summary:'Error uploading avatar' + error,sticky:true});
      }
    );
  }  
  
}

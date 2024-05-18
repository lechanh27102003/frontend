import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  currentLink: string = '/my-account';
  constructor(private authService: AuthService, private router: Router) {}
  
  setActive(link: string) {
    this.currentLink = link;
  }
  logout(): void {
    // Xử lý đăng xuất
    this.authService.logout();
    this.router.navigate(['']); 
  }
}

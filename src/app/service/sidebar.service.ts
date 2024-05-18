import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isSidebarClosed: boolean = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}

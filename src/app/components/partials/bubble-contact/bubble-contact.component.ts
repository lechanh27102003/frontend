import { Component } from '@angular/core';

@Component({
  selector: 'app-bubble-contact',
  templateUrl: './bubble-contact.component.html',
  styleUrls: ['./bubble-contact.component.css']
})
export class BubbleContactComponent {
  
  scrollToTop(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css'],
 
})
export class SlideShowComponent implements OnInit {
  counter: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      const radioElement = document.getElementById('radio' + this.counter) as HTMLInputElement;
      if (radioElement) {
        radioElement.checked = true;
      }
      this.counter++;
      if (this.counter > 4) {
        this.counter = 1;
      }
    }, 2500);
  }
  goToProductPage(): void {
    this.router.navigate(['/product-client/0']);
}
}


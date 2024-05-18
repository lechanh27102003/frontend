import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Plantique';
  showTopMenuAndFooter: boolean = true;

  hideTopMenuAndFooter() {
    this.showTopMenuAndFooter = false;
  }
}

  





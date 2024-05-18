import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-star',
  templateUrl: './product-star.component.html',
  styleUrl: './product-star.component.css'
})
export class ProductStarComponent implements OnInit {
  constructor(private route: ActivatedRoute
  ) {
  }

  ngOnInit() : void {
  }
}

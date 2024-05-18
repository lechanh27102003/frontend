import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent implements OnInit {
  @Input() product : any;

  constructor(private route: ActivatedRoute,
  ) {
  }

  ngOnInit() : void {
  }
}

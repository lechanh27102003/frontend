import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FeedBackPopUpComponent } from '../../feed-back-pop-up/feed-back-pop-up.component';
import { AuthService } from '../../../../../service/auth.service';

@Component({
  selector: 'product-feedback',
  templateUrl: './product-feedback.component.html',
  styleUrl: './product-feedback.component.css'
})
export class ProductFeedbackComponent implements OnInit {
@Input() feedbacks : any;
username !: string;
userUrl !: string;
  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService : AuthService
  ) {
  }

  ngOnInit() : void {
  
  }

  ShowFeedBackPopUp(){
    this.dialog.open(FeedBackPopUpComponent);
  }
}

import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-fb-popup',
  templateUrl: './fb-popup.component.html',
  styleUrl: './fb-popup.component.css'
})
export class FbPopupComponent {
  replyContent: string = '';

    constructor(
        public dialogRef: MatDialogRef<FbPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onReplyClick(): void {
        // You can handle the reply logic here, for example, send the reply to the server
        // Once done, close the dialog
        this.dialogRef.close(this.replyContent);
    }
}



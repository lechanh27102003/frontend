export interface Feedback {
  Name: string;
  Content: string;
  Status: string;
  Date: string;
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FbPopupComponent } from '../../partials/fb-popup/fb-popup.component';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent {
  constructor(public dialog: MatDialog) { }

  list_Feedback= [
      { Name: 'Lý Thị Lẽ', Content: '<p style="word-wrap: break-word">Đặt để nấu cho chồng ăn, chồng khen ngon, cho shop 5 sao. Nhưng sản phẩm nhanh hết hàng quá, một lần mua khó. Chắc phải mua trữ dần ở nhà thôi.</p>', Status: 'Wait', Date: '2024-04-11' },
      { Name: 'Lê Minh Hồ', Content: '<p style="word-wrap: break-word">Mình được tặng 1 lần, ăn thấy ngon nên đặt mua lại, vẫn ngon như ngày đầu</p>', Status: 'Replied', Date: '2024-04-8' },
      // Add more feedbacks here
  ];
  openReplyDialog(feedback: any): void {
    const dialogRef = this.dialog.open(FbPopupComponent, {
        width: '400px',
        data: feedback
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log('Reply content: ', result);
        // Handle the reply content here
    });
}
onReplyClick(feedback: any) {
  // Xử lý logic khi nhấp vào ô trong bảng
  // Mở pop-up hoặc thực hiện các hành động khác
  console.log('Reply clicked for:', feedback);
}
}



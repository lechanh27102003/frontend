import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { TopMenuComponent } from './components/partials/top-menu/top-menu.component';
import { ChinhSachVanChuyenComponent } from './components/pages/chinh-sach-van-chuyen/chinh-sach-van-chuyen.component';
import { ChinhSachDoiTraComponent } from './components/pages/chinh-sach-doi-tra/chinh-sach-doi-tra.component';
import { ChinhSachBaoMatComponent } from './components/pages/chinh-sach-bao-mat/chinh-sach-bao-mat.component';
import { HuongDanMuaHangComponent } from './components/pages/huong-dan-mua-hang/huong-dan-mua-hang.component';
import { PhuongThucThanhToanComponent } from './components/pages/phuong-thuc-thanh-toan/phuong-thuc-thanh-toan.component';
import { TinTucComponent } from './components/pages/tin-tuc/tin-tuc.component';
import { DashboardComponent } from './components/pages/admin/pages/dashboard/dashboard.component';
import { ProductComponent } from './components/pages/admin/pages/product/product.component';
import { OrderComponent } from './components/pages/admin/pages/order/order.component';
import { CustomerComponent } from './components/pages/admin/pages/customer/customer.component';
import { PromotionComponent } from './components/pages/admin/pages/promotion/promotion.component';
import { FeedbackComponent } from './components/pages/admin/pages/feedback/feedback.component';
import { BlogComponent } from './components/pages/admin/pages/blog/blog.component';
import { AuthorityComponent } from './components/pages/admin/pages/authority/authority.component';
import { AdminHeaderComponent } from './components/pages/admin/partials/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/pages/admin/partials/admin-sidebar/admin-sidebar.component';
import { SidebarService } from './service/sidebar.service';
import { AdminLayoutComponent } from './components/pages/admin/pages/admin-layout/admin-layout.component';
import { PromotionPopupService } from './service/promotion-popup.service';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { FbPopupComponent } from './components/pages/admin/partials/fb-popup/fb-popup.component';
import { FootComponent } from './components/pages/admin/partials/foot/foot.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './components/pages/client/client.component';
import { ProductCardComponent } from './components/pages/product/product-card/product-card.component';
import { ProductClientComponent } from './components/pages/product/product.component';
import { ProductDescriptionComponent } from './components/pages/product/product-detail/product-description/product-description.component';
import { ProductFeedbackComponent } from './components/pages/product/product-detail/product-feedback/product-feedback.component';
import { ProductDetailComponent } from './components/pages/product/product-detail/product-detail.component';
import { ProductStarComponent } from './components/pages/product/product-star/product-star.component';
import { PopupComponent } from './components/pages/admin/pages/product/popup/popup.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { OrderDetailsComponent } from './components/pages/admin/pages/order-details/order-details.component';
import { AdminContactComponent } from './components/pages/admin/pages/admin-contact/admin-contact.component';
import { ShippingInfoComponent } from './components/pages/shipping-info/shipping-info.component';
import { OrderConfirmationComponent } from './components/pages/order-confirmation/order-confirmation.component';
import { SingleBlogComponent } from './components/pages/single-blog/single-blog.component';
import { FeedBackPopUpComponent } from './components/pages/product/feed-back-pop-up/feed-back-pop-up.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { UserDetailComponent } from './components/pages/user-detail/user-detail.component';
import { UploadService } from './service/client-service/upload.service';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { ClientOrderDetailsComponent } from './components/pages/client-order-details/client-order-details.component';
import { QrCodeDialogComponent } from './components/pages/qr-code-dialog/qr-code-dialog.component';
import { OrderSuccessDialogComponent } from './components/pages/order-success-dialog/order-success-dialog.component';
import { AdminContactDetailsComponent } from './components/pages/admin/pages/admin-contact-details/admin-contact-details.component';
import { ForgetPasswordComponent} from './components/pages/forget-password/forget-password.component';
import { ResetComponent } from './components/pages/reset/reset.component';

import { BubbleContactComponent } from './components/partials/bubble-contact/bubble-contact.component';
import { CreateCampaignComponent } from './components/pages/admin/pages/promotion/create-campaign/create-campaign.component';
import { CreateCodeComponent } from './components/pages/admin/pages/promotion/create-code/create-code.component';
import { OrderSearchComponent } from './components/pages/order-search/order-search.component'
import { SlideShowComponent } from './components/partials/slide-show/slide-show.component';
import { NgToastModule } from 'ng-angular-popup';
import { CouponCardComponent } from './components/partials/coupon-card/coupon-card.component'
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectionList } from '@angular/material/list';
import { TermsComponent } from './components/pages/terms/terms.component';
import { InspectionComponent } from './components/pages/inspection/inspection.component'




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    TopMenuComponent,
    ChinhSachVanChuyenComponent,
    ChinhSachDoiTraComponent,
    ChinhSachBaoMatComponent,
    HuongDanMuaHangComponent,
    PhuongThucThanhToanComponent,
    TinTucComponent,
    DashboardComponent,
    ProductComponent,
    OrderComponent,
    CustomerComponent,
    PromotionComponent,
    FeedbackComponent,
    BlogComponent,
    AuthorityComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLayoutComponent,
    AboutUsComponent,
    FbPopupComponent,
    FootComponent,
    ClientComponent,
    ProductClientComponent,
    ProductCardComponent,
    ProductDescriptionComponent,
    ProductFeedbackComponent,
    ProductDetailComponent,
    ProductStarComponent,
    PopupComponent,
    ContactComponent,
    OrderDetailsComponent,
    ShippingInfoComponent,
    OrderConfirmationComponent,
    FeedBackPopUpComponent,
    MyAccountComponent,
    UserDetailComponent,
    CartPageComponent,
    OrderHistoryComponent,
    ClientOrderDetailsComponent,
    QrCodeDialogComponent,
    OrderSuccessDialogComponent,
    AdminContactComponent,
    AdminContactDetailsComponent,
    BubbleContactComponent,
    CreateCampaignComponent,
    CreateCodeComponent,
    OrderSearchComponent,
    SingleBlogComponent,
    SlideShowComponent,
    CouponCardComponent,
    TermsComponent,
    InspectionComponent,
  ],
  exports: [
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    QRCodeModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectionList
  ],

  providers: [SidebarService, PromotionPopupService, provideAnimationsAsync(),UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

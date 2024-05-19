import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { TopMenuComponent } from './components/partials/top-menu/top-menu.component'
import { ChinhSachVanChuyenComponent } from './components/pages/chinh-sach-van-chuyen/chinh-sach-van-chuyen.component';
import { ChinhSachDoiTraComponent } from './components/pages/chinh-sach-doi-tra/chinh-sach-doi-tra.component';
import { ChinhSachBaoMatComponent } from './components/pages/chinh-sach-bao-mat/chinh-sach-bao-mat.component';
import { HuongDanMuaHangComponent } from './components/pages/huong-dan-mua-hang/huong-dan-mua-hang.component';
import { PhuongThucThanhToanComponent } from './components/pages/phuong-thuc-thanh-toan/phuong-thuc-thanh-toan.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { TinTucComponent } from './components/pages/tin-tuc/tin-tuc.component';
import { AdminLayoutComponent } from './components/pages/admin/pages/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/pages/admin/pages/dashboard/dashboard.component';
import { ProductComponent } from './components/pages/admin/pages/product/product.component';
import { OrderComponent } from './components/pages/admin/pages/order/order.component';
import { CustomerComponent } from './components/pages/admin/pages/customer/customer.component';
import { PromotionComponent } from './components/pages/admin/pages/promotion/promotion.component';
import { BlogComponent } from './components/pages/admin/pages/blog/blog.component';
import { AuthorityComponent } from './components/pages/admin/pages/authority/authority.component';
import { FbPopupComponent } from './components/pages/admin/partials/fb-popup/fb-popup.component';
import { ProductClientComponent } from './components/pages/product/product.component';
import { ProductDetailComponent } from './components/pages/product/product-detail/product-detail.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { OrderDetailsComponent } from './components/pages/admin/pages/order-details/order-details.component';
import { ContactDetailsComponent } from './components/pages/admin/pages/admin-contact/contact-details/contact-details.component';
import { ShippingInfoComponent } from './components/pages/shipping-info/shipping-info.component';
import { OrderConfirmationComponent } from './components/pages/order-confirmation/order-confirmation.component';
import { ClientComponent } from './components/pages/client/client.component';
import { UserDetailComponent } from './components/pages/user-detail/user-detail.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { OrderSearchComponent } from './components/pages/order-search/order-search.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { ClientOrderDetailsComponent } from './components/pages/client-order-details/client-order-details.component';
import { QrCodeDialogComponent } from './components/pages/qr-code-dialog/qr-code-dialog.component';
import { OrderSuccessDialogComponent } from './components/pages/order-success-dialog/order-success-dialog.component';
import { SingleBlogComponent } from './components/pages/single-blog/single-blog.component';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { ResetComponent } from './components/pages/reset/reset.component';
import { SlideShowComponent } from './components/partials/slide-show/slide-show.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { InspectionComponent } from './components/pages/inspection/inspection.component';
import { AdminContactComponent } from './components/pages/admin/pages/admin-contact/admin-contact.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductComponent },
      { path: 'order', component: OrderComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'promotion', component: PromotionComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'authority', component: AuthorityComponent },
      { path: 'fb-popup',component: FbPopupComponent},
      { path: 'admin-contact', component: AdminContactComponent },
      { path: 'admin-contact-details/:id', component: ContactDetailsComponent },
     
      
    ]
  },


  { 
    path: '', 
    component: ClientComponent , 
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset/:token', component:ResetComponent },
      { path: 'cart-page', component:CartPageComponent },
      { 
        path: 'my-account',
        component: MyAccountComponent,
        children: [
          {path: '', component: UserDetailComponent },
          {path:'order-history', component:OrderHistoryComponent},
          
         
          
        ]
      },
      { path: 'login', component: LoginPageComponent },
      {path:'client-order-details/:id',component:ClientOrderDetailsComponent},
      { path: '', component: HomepageComponent },
      { path: 'chinh-sach-van-chuyen', component: ChinhSachVanChuyenComponent },
      { path: 'chinh-sach-doi-tra', component: ChinhSachDoiTraComponent },
      { path: 'chinh-sach-bao-mat', component: ChinhSachBaoMatComponent },
      { path: 'huong-dan-mua-hang', component: HuongDanMuaHangComponent },
      { path: 'phuong-thuc-thanh-toan', component: PhuongThucThanhToanComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'tin-tuc', component: TinTucComponent }, 
      { path: 'product-client/:id', component: ProductClientComponent },
      { path: 'product-detail/:id', component: ProductDetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
      { path: 'qr-code', component: QrCodeDialogComponent},
      { path: 'order-success', component: OrderSuccessDialogComponent},
      { path: 'shipping-info', component: ShippingInfoComponent },
      { path: 'order-confirmation', component: OrderConfirmationComponent },
      { path: 'slide-show', component:SlideShowComponent},
      {path:'order-search',component:OrderSearchComponent},
      { path: 'single-blog/:id', component: SingleBlogComponent },
      {path:'terms', component: TermsComponent},
      {path:'inspection', component: InspectionComponent},
    
     
    ]
  }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

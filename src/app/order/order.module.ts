import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminOrderPageComponent } from './components/admin-order-page/admin-order-page.component';



@NgModule({
  declarations: [
    OrderPageComponent,
    UserOrdersComponent,
    AdminOrderPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }

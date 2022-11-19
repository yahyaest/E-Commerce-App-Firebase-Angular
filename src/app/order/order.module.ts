import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';



@NgModule({
  declarations: [
    OrderPageComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }

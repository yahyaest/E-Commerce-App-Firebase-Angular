import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setOrderId } from 'src/app/actions/navbar.action';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { User } from 'src/app/user/models/user.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  user!: User;
  isLoading = true;
  userOrders! : Order[];
  orderId!: string | null;

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.orderId = res.orderId;
    });
  }

  async getUserOrder(){
    let userOrders: Order[] = []
    const userOrdersDocs =  await this.orderService.getUserOrders(this.user.email)
    for (const doc of userOrdersDocs) {
      let order = doc.data()
      order['id'] = doc.id
      userOrders.push(order as Order)
    }
    this.userOrders = userOrders as any
  }

  goToOrderPage(orderId:string){
    this.store.dispatch(setOrderId(orderId));
    localStorage.setItem('orderId', orderId);
    this.router.navigate(['order', `${orderId}`])
  }

  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (!this.user || this.user === null) this.router.navigate(['/']);
    else await this.getUserOrder();
    this.isLoading = false;
  }
}

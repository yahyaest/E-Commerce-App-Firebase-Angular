import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getOrderId,
  getUserId,
  removeIsOrderIcon,
  removeOrderId,
  setNotifications,
} from 'src/app/actions/navbar.action';
import { Order } from 'src/app/order/models/order.model';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { OrderService } from '../../services/order.service';
import { User } from 'src/app/user/models/user.model';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  order!: Order;
  user!: User;
  userId!: string | null;
  orderId!: string | null;
  userEmail!: string | null;
  username!: string | null;
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.userId = res.userId;
      this.orderId = res.orderId;
    });
  }

  getUserId() {
    this.store.dispatch(getUserId());
  }

  getOrderId() {
    this.store.dispatch(getOrderId());
  }

  setNotifications(notifications: number) {
    this.store.dispatch(setNotifications(notifications));
  }

  async getUserOrders() {
    const email = JSON.parse(localStorage.getItem('user') as string)?.email;
    let userOrders: Order[] = [];
    const userOrdersDocs = await this.orderService.getUserOrders(email);
    for (const doc of userOrdersDocs) {
      let order = doc.data();
      order['id'] = doc.id;
      userOrders.push(order as Order);
    }
    return userOrders;
  }

  async getOrder() {
    try {
      const order = await this.orderService.getOrder(this.orderId as string);
      this.order = order.data() as Order;
      this.order.clientEmail = this.user.email;
    } catch (err) {
      alert(err);
    }
  }

  async confirmOrder() {
    let order = this.order;
    order.status = 'In Progress';
    const notification: Notification = {
      title: 'Order Confirmed',
      discription: `the order with id ${this.orderId} was confirmed by ${
        JSON.parse(localStorage.getItem('user') as string).username
      }`,
      userEmail: this.userEmail as string,
      created_at: new Date().toISOString(),
    };
    try {
      this.orderService.updateOrder(this.orderId as string, order);
      const addedNotification = await this.notificationService.addNotification(
        notification
      );
      // Get user notifs
      const userNotifications =
        await this.notificationService.getUserNotifications(
          this.userEmail as string
        );
      this.setNotifications(userNotifications.length);
    } catch (err) {
      alert(err);
    }
  }

  async cancelOrder() {
    const notification: Notification = {
      title: 'Order Canceled',
      discription: `the order with id ${this.orderId} was canceled by ${
        JSON.parse(localStorage.getItem('user') as string).username
      }`,
      userEmail: this.userEmail as string,
      created_at: new Date().toISOString(),
    };
    try {
      // Delete Order
      this.orderService.deleteOrder(this.orderId as string);
      localStorage.removeItem('orderId');
      this.store.dispatch(removeOrderId());
      const userOrders = await (await this.getUserOrders()).length;
      if( userOrders < 1) {
        this.store.dispatch(removeIsOrderIcon());
        localStorage.setItem('isOrderIcon', 'false');
      }

      // Get user notifs
      const addedNotification = await this.notificationService.addNotification(
        notification
      );
      const userNotifications =
        await this.notificationService.getUserNotifications(
          this.userEmail as string
        );
      this.setNotifications(userNotifications.length);
      this.router.navigate(['/']);
    } catch (err) {
      alert(err);
    }
  }

  goToUserOrders(){
    this.router.navigate(['orders',`${this.username}`]);
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.user = JSON.parse(localStorage.getItem('user') as string);
    await this.getOrderId();
    if (!this.userId || this.userId === null) this.router.navigate(['/']);
    else await this.getOrder();
    this.userId
      ? (this.userEmail = JSON.parse(
          localStorage.getItem('user') as string
        ).email)
      : (this.userEmail = null);
      
      this.userId
      ? (this.username = JSON.parse(
          localStorage.getItem('user') as string
        ).username)
      : (this.username = null);
    this.isLoading = false;
  }
}

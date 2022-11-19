import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getCartId,
  getIsOrderIcon,
  getNotifications,
  getOrderId,
  getUserId,
  getUsername,
  removeIsOrderIcon,
  removeOrderId,
  removeUserId,
  removeUsername,
  setIsOrderIcon,
} from 'src/app/actions/navbar.action';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Order } from 'src/app/order/models/order.model';
import { OrderService } from 'src/app/order/services/order.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartId!: string | null;
  orderId!: string | null;
  userId!: string | null;
  username!: string | null;
  notifications!: number;
  displayNotification = false;
  displayOrderIcon = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.userId = res.userId;
      this.cartId = res.cartId;
      this.orderId = res.orderId;
      this.username = res.username;
      this.notifications = res.notifications;
      this.displayOrderIcon = res.isOrderIcon;
    });
  }

  goToCartPage() {
    this.router.navigate(['cart', `${this.cartId}`]);
  }

  goToOrderPage() {
    this.orderId
      ? this.router.navigate(['order', `${this.orderId}`])
      : this.router.navigate(['orders', `${this.username}`]);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToUserPage() {
    this.router.navigate(['user', `${this.username}`]);
  }

  setDisplayNotification() {
    this.notifications < 1
      ? (this.displayNotification = false)
      : (this.displayNotification = !this.displayNotification);
  }

  async logout() {
    const logout = await this.authService.logout();
    this.removeUserId();
    this.removeUsername();
    this.removeOrderId();
    this.removeIsOrderIcon();
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('orderId');
    localStorage.removeItem('isOrderIcon');
    this.router.navigate(['/']);
  }

  getUsername() {
    this.store.dispatch(getUsername());
  }

  removeUsername() {
    this.store.dispatch(removeUsername());
  }

  getUserId() {
    this.store.dispatch(getUserId());
  }

  removeUserId() {
    this.store.dispatch(removeUserId());
  }

  getCartId() {
    this.store.dispatch(getCartId());
  }

  getOrderId() {
    this.store.dispatch(getOrderId());
  }

  removeOrderId() {
    this.store.dispatch(removeOrderId());
  }

  removeIsOrderIcon() {
    this.store.dispatch(removeIsOrderIcon());
  }

  async getUserNotifications(userEmail: string) {
    const userNotifications =
      await this.notificationService.getUserNotifications(userEmail);
    return userNotifications.length;
  }

  async getNotifications() {
    const userEmail = JSON.parse(localStorage.getItem('user') as string)?.email;
    const userNotifications = await this.getUserNotifications(userEmail);
    this.store.dispatch(getNotifications(userNotifications));
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

  async HandleOrderIcon() {
    if (this.userId) {
      const userOrders = await (await this.getUserOrders()).length;
      if (this.orderId || userOrders > 0) {
        this.displayOrderIcon = true;
        localStorage.setItem('isOrderIcon', 'true');
        this.store.dispatch(setIsOrderIcon(true));
      }
    } else {
      this.displayOrderIcon = false;
      localStorage.setItem('isOrderIcon', 'false');
      this.store.dispatch(setIsOrderIcon(false));
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    await this.getCartId();
    await this.getOrderId();
    await this.getUsername();
    await this.getNotifications();
    await this.HandleOrderIcon();
  }
}

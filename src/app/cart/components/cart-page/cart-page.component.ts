import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getCartId,
  getNotifications,
  removeCartId,
  setNotifications,
  setOrderId,
} from 'src/app/actions/navbar.action';
import { OrderService } from 'src/app/order/services/order.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Order } from '../../../order/models/order.model';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  cartId!: string | null;
  userId!: string | null;
  userEmail!: string | null;
  notifications!: Number;
  quantity = 1;
  isLoading = true;
  prevQuantities: number[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.cartId = res.cartId;
      this.userId = res.userId;
      this.notifications = res.notifications;
    });
  }

  async getCart() {
    try {
      const cart = await this.cartService.getCart(this.cartId as string);
      this.cart = cart.data() as Cart;
    } catch (err) {
      alert(err);
    }
  }

  updateCart(cart: Cart) {
    cart.last_update = new Date().toISOString();
    this.cartService.updateCart(this.cartId as string, cart);
    this.router.navigate(['/']);
  }

  deleteCart() {
    this.cartService.deleteCart(this.cartId as string);
    localStorage.removeItem('cartId');
    this.store.dispatch(removeCartId());
    this.router.navigate(['/']);
  }

  updateCartProductQuantity(productIndex: number, quantity: number) {
    const cart = { ...this.cart };
    const productPrice = +cart.products[productIndex].product.price
      .split('TND')[0]
      .replace(',', '.');
    cart.totalPrice =
      cart.totalPrice -
      productPrice * this.prevQuantities[productIndex] +
      productPrice * quantity;
    cart.products[productIndex].quantity = quantity;
    this.cart = cart;
    this.prevQuantities[productIndex] = quantity;
  }

  deleteCartProduct(productIndex: number) {
    const cart = { ...this.cart };
    const productPrice = +cart.products[productIndex].product.price
      .split('TND')[0]
      .replace(',', '.');
    cart.totalPrice =
      cart.totalPrice - productPrice * cart.products[productIndex].quantity;
    cart.products.splice(productIndex, 1);
    this.cart = cart;
  }

  getCartId() {
    this.store.dispatch(getCartId());
  }

  setNotifications(notifications: number) {
    this.store.dispatch(setNotifications(notifications));
  }

  async addOrder() {
    if (this.userId) {
      let order: Order = {} as Order;
      order.created_at = new Date().toISOString();
      order.products = this.cart.products;
      order.totalPrice = this.cart.totalPrice;
      order.status = 'Not Started';
      order.clientEmail = JSON.parse(localStorage.getItem('user')as string).email;
      try {
        // Create Order
        const addedOrder = await this.orderService.addOrder(order);
        localStorage.setItem('orderId', addedOrder.id);
        this.store.dispatch(setOrderId(addedOrder.id));
        // Delete Cart
        this.deleteCart();
        // Create Notification
        const notification: Notification = {
          title: 'Order Created',
          discription: `A new order was created by ${
            JSON.parse(localStorage.getItem('user') as string).username
          }`,
          userEmail: this.userEmail as string,
          created_at: new Date().toISOString(),
        };
        const addedNotification =
          await this.notificationService.addNotification(notification);
        // Get user notifs
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
  }

  async ngOnInit(): Promise<void> {
    await this.getCartId();
    await this.getCart();
    for (let element of this.cart.products) {
      this.prevQuantities.push(element.quantity);
    }
    this.userId
      ? (this.userEmail = JSON.parse(
          localStorage.getItem('user') as string
        ).email)
      : (this.userEmail = null);
    this.isLoading = false;
  }
}

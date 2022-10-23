import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getCartId,
  getOrderId,
  getUserId,
  removeCartId,
  removeOrderId,
} from 'src/app/actions/navbar.action';
import { Order } from 'src/app/cart/models/order.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  order!: Order;
  userId!: string | null;
  cartId!: string | null;
  orderId!: string | null;
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.userId = res.userId;
      this.cartId = res.cartId;
      this.orderId = res.orderId;
    });
  }

  getOrder() {
    return this.orderService
      .getOrder(this.orderId as string)
      .then((result) => (this.order = result.data() as Order));
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.orderId as string);
    localStorage.removeItem('orderId');
    this.store.dispatch(removeOrderId());
    this.deleteCart()
    this.router.navigate(['/']);
  }

  deleteCart() {
    this.cartService.deleteCart(this.cartId as string);
    localStorage.removeItem('cartId');
    this.store.dispatch(removeCartId());
    this.router.navigate(['/']);
  }

  getUserId() {
    this.store.dispatch(getUserId());
  }

  getCartId() {
    this.store.dispatch(getCartId());
  }

  getOrderId() {
    this.store.dispatch(getOrderId());
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    await this.getCartId();
    await this.getOrderId();
    this.isLoading = false;
    if (!this.userId || this.userId === null) this.router.navigate(['/']);
    else await this.getOrder();
  }
}

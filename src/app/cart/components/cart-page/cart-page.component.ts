import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCartId, removeCartId, setOrderId } from 'src/app/actions/navbar.action';
import { OrderService } from 'src/app/order/services/order.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  cartId!: string | null;
  quantity = 1;
  isLoading = true;
  prevQuantities: number[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.cartId = res.cartId;
    });
  }

  getCart() {
    return this.cartService
      .getCart(this.cartId as string)
      .then((result) => (this.cart = result.data() as Cart));
  }

  updateCart(cart: Cart) {
    cart.last_update = new Date().toISOString();
    this.cartService.updateCart(this.cartId as string, cart);
    this.router.navigate(['/']);
  }

  deleteCart() {
    this.cartService.deleteCart(this.cartId as string);
    localStorage.removeItem('cartId');
    this.store.dispatch(removeCartId())
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

  addOrder(){
    let order : Order = {} as Order
    order.created_at  = new Date().toISOString();
    order.products = this.cart.products
    order.totalPrice = this.cart.totalPrice
    order.status = 'Not Started'
    this.orderService.addOrder(order).then((result) => {
      localStorage.setItem('orderId', result.id);
      this.store.dispatch(setOrderId(result.id))

    });
  }

  async ngOnInit(): Promise<void> {
    await this.getCartId();
    await this.getCart();
    this.isLoading = false;
    for (let element of this.cart.products) {
      this.prevQuantities.push(element.quantity);
    }
  }
}

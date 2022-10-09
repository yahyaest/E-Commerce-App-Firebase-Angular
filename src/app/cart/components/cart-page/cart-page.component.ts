import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  quantity = 1;
  isLoading = true;
  prevQuantities: number[] = [];

  constructor(
    private cartService: CartService,
    private router:Router  ) {}

  getCart() {
    return this.cartService
      .getCart()
      .then((result) => (this.cart = result.data() as Cart));
  }

  updateCart(cart:Cart) {
   // const cart = { ...this.cart };
    cart.last_update = new Date().toISOString();
    this.cartService.updateCart(cart);
    // Add Refresh Page
  }

  deleteCart(){
    this.cartService.deleteCart()
    this.router.navigate(['/'])
  }

  updateCartProductQuantity(productIndex: number, quantity: number) {
    const cart = { ...this.cart };
    const productPrice = +cart.products[productIndex].product.price
      .split('TND')[0]
      .replace(',', '.');
    cart.totalPrice = cart.totalPrice - productPrice * this.prevQuantities[productIndex] + productPrice * quantity ;
    cart.products[productIndex].quantity = quantity
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

  async ngOnInit(): Promise<void> {
    await this.getCart();
    this.isLoading = false;
    for (let element of this.cart.products) {
      this.prevQuantities.push(element.quantity);
    }
  }
}

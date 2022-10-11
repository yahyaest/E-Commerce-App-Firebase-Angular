import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart.service';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  cart!: Cart;
  cartId!: string | null
  isLoading = true;
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    const urlParam = {
      collection: this.route.snapshot.paramMap.get('collection'),
      slug: this.route.snapshot.paramMap.get('slug'),
    };

    this.productsService.getProduct(urlParam).subscribe((result: any) => {
      this.product = result;
      this.isLoading = false;
    });
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.inventory) this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  getCart(){
  return  this.cartService
    .getCart()
    .then((result) => (this.cart = result.data() as Cart));
  }

  addCart() {
    const cart: Cart = { products: [], totalPrice: 0 };
    cart.products.push({ product: this.product, quantity: this.quantity });
    const productPrice = +this.product.price.split('TND')[0].replace(',', '.');
    cart.totalPrice = productPrice * this.quantity;
    cart.created_at = new Date().toISOString();
    this.cartService.addCart(cart);
    this.cart = cart
  }

  updateCart(cart:Cart) {
    //const cart = {...this.cart}
    cart.products.push({ product: this.product, quantity: this.quantity });
    const productPrice = +this.product.price.split('TND')[0].replace(',', '.');
    cart.totalPrice = cart.totalPrice + productPrice * this.quantity;
    cart.last_update = new Date().toISOString();
    this.cartService.updateCart(cart)
  }

  addOrUpdateCart() {
    const cart = {...this.cart}
     this.cartId = localStorage.getItem('cartId');
    return this.cartId ? this.updateCart(cart) : this.addCart();
  }

 async ngOnInit(): Promise<void> {
    this.product = history.state;
    this.cartId = localStorage.getItem('cartId');
    this.cartId ? await this.getCart() : (this.cart = undefined as any);
  }
}

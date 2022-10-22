import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { setCartId } from 'src/app/actions/navbar.action';
import { Cart } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { StoreState } from 'src/app/reducers/navbar.reducer';

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
  cartId!: string | null;
  isLoading = true;
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    const urlParam = {
      collection: this.route.snapshot.paramMap.get('collection'),
      slug: this.route.snapshot.paramMap.get('slug'),
    };

    this.productsService.getProduct(urlParam).subscribe((result: any) => {
      this.product = result;
      this.isLoading = false;
    });

    store.select('navbar').subscribe((res) => {
      this.cartId = res.cartId;
    });
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.inventory) this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  getCart() {
    const cartId = localStorage.getItem('cartId') as string;
    return this.cartService
      .getCart(cartId)
      .then((result) => (this.cart = result.data() as Cart));
  }

  addCart() {
    const cart: Cart = { products: [], totalPrice: 0 };
    cart.products.push({ product: this.product, quantity: this.quantity });
    const productPrice = +this.product.price.split('TND')[0].replace(',', '.');
    cart.totalPrice = productPrice * this.quantity;
    cart.created_at = new Date().toISOString();
    this.cartService.addCart(cart).then((result) => {
      localStorage.setItem('cartId', result.id);
      this.store.dispatch(setCartId(result.id))

    });
    this.cart = cart;
  }

  updateCart(cart: Cart) {
    const cartId = localStorage.getItem('cartId') as string;
    cart.products.push({ product: this.product, quantity: this.quantity });
    const productPrice = +this.product.price.split('TND')[0].replace(',', '.');
    cart.totalPrice = cart.totalPrice + productPrice * this.quantity;
    cart.last_update = new Date().toISOString();
    this.cartService.updateCart(cartId, cart);
  }

  addOrUpdateCart() {
    const cart = { ...this.cart };
    this.cartId = localStorage.getItem('cartId');
    return this.cartId ? this.updateCart(cart) : this.addCart();
  }

  async ngOnInit(): Promise<void> {
    this.product = history.state;
    this.cartId = localStorage.getItem('cartId');
    this.cartId ? await this.getCart() : (this.cart = undefined as any);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getCartId,
  getOrderId,
  getUserId,
  getUsername,
  removeOrderId,
  removeUserId,
  removeUsername,
} from 'src/app/actions/navbar.action';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  constructor(
    private authService: AuthService,
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
    });
  }

  goToCartPage() {
    this.router.navigate(['cart', `${this.cartId}`]);
  }

  goToOrderPage() {
    this.router.navigate(['order', `${this.orderId}`]);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToUserPage() {
    this.router.navigate(['user', `${this.username}`]);
  }

 async logout() {
   const logout = await this.authService.logout()
      this.removeUserId();
      this.removeUsername();
      this.removeOrderId();
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('orderId');
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

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    await this.getCartId();
    await this.getOrderId();
    await this.getUsername();
  }
}

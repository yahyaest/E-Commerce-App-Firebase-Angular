import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getCartId,
  getUserId,
  removeUserId,
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
  userId!: string | null;
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
    });
  }

  goToCartPage() {
    this.router.navigate(['cart', `${this.cartId}`]);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.removeUserId();
      localStorage.removeItem('userId');
      this.router.navigate(['/']);
    });
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

  async ngOnInit(): Promise<void> {
    this.cartId = localStorage.getItem('cartId');
    await this.getUserId();
    await this.getCartId();
    console.log(this.userId, this.cartId);
  }
}

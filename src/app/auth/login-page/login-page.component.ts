import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { getUserId, setUserId } from 'src/app/actions/navbar.action';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  email!: string;
  password!: string;
  passwordConfirm!: string;
  userId!: string | null;
  isLogin = true;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faTwitter = faTwitter;
  faGithub = faGithub;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{
      navbar: StoreState;
    }>
  ) {
    store.select('navbar').subscribe((res) => {
      this.userId = res.userId;
    });
  }

  setIsLogin(bool: boolean) {
    this.isLogin = bool;
  }

  register(f: NgForm) {
    if (f.value.password !== f.value.passwordConfirm)
      return alert('password and passwordConfirm are different !');
    this.authService
      .register(f.value.email, f.value.password)
      .then((res) => {
        localStorage.setItem('userId', res.user?.uid as string);
        this.router.navigate(['/']);
      })
      .catch((err) => alert(err));
  }

  login(f: NgForm) {
    this.authService
      .login(f.value.email, f.value.password)
      .then(async (res) => {
        localStorage.setItem('userId', res.user?.uid as string);
        this.setUserId(res.user?.uid);
        this.router.navigate(['/']);
      })
      .catch((err) => alert(err));
  }

  googleLogin() {
    this.authService
      .googleLogin()
      .then(async (res) => {
        localStorage.setItem('userId', res.user?.uid as string);
        this.setUserId( res.user?.uid);
        this.router.navigate(['/']);
      })
      .catch((err) => alert(err));
  }

  logout() {
    this.authService.logout().then(() => {
      localStorage.removeItem('userId');
    });
  }

  getUserId() {
    this.store.dispatch(getUserId());
  }

  setUserId(userId: any) {
    this.store.dispatch(setUserId(userId));
  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    if (this.userId) this.router.navigate(['/']);
  }
}

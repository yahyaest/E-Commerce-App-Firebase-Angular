import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { getUserId, setUserId, setUsername } from 'src/app/actions/navbar.action';
import { StoreState } from 'src/app/reducers/navbar.reducer';
import { User } from 'src/app/user/models/user.model';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username!: string;
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
    private userService: UserService,
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

  async register(f: NgForm) {
    if (f.value.password !== f.value.passwordConfirm)
      return alert('password and passwordConfirm are different !');
    try {
      const authRegister = await this.authService.register(
        f.value.email,
        f.value.password
      );
      // console.log(res.user?.emailVerified) to implement
      // console.log(res.user?.photoURL) to implement
      let user: User = {
        username: f.value.username,
        email: f.value.email,
        password: f.value.password,
        emailVerified: false,
        role: 'USER',
      };
      const userRegister = await this.userService.addUser(user);
      localStorage.setItem('userId', authRegister.user?.uid as string);
      //localStorage.setItem('userId', userRegister.id);
      this.router.navigate(['/']);
    } catch (err) {
      alert(err);
    }
  }

  async login(f: NgForm) {
    try {
      const login = await this.authService.login(
        f.value.email,
        f.value.password
      );
      const user = await this.userService.getUser(f.value.email);
      console.log(user.data());
      localStorage.setItem('userId', login.user?.uid as string);
      this.setUserId(login.user?.uid);
      localStorage.setItem('user', JSON.stringify(user.data()))
      this.setUsername(user.data()['username'])
      this.router.navigate(['/']);
    } catch (err) {
      alert(err);
    }
  }

  async googleLogin() {
    try {
      const login = await this.authService.googleLogin();
      localStorage.setItem('userId', login.user?.uid as string);
      this.setUserId(login.user?.uid);
      this.router.navigate(['/']);
    } catch (err) {
      alert(err);
    }
  }

  async logout() {
    await this.authService.logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('user')
  }

  setUsername(username: string) {
    this.store.dispatch(setUsername(username));
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

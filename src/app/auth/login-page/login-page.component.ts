import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  email! : string;
  password! : string;
  passwordConfirm! : string;
  userId!: string | null
  isLogin = true;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faTwitter = faTwitter;
  faGithub = faGithub;

  constructor( private authService:AuthService,private router: Router) {}

  setIsLogin(bool: boolean) {
    this.isLogin = bool;
  }

  register(f: NgForm){
    if (f.value.password !== f.value.passwordConfirm) return alert("password and passwordConfirm are different !")
   this.authService.register(f.value.email,f.value.password)
  }

  login(f: NgForm){
    this.authService.login(f.value.email,f.value.password).then((res)=>{
      localStorage.setItem('userId', res.user?.uid as string)
      this.router.navigate(['/'])
    }).catch(err => alert(err))
  }

  logout(){
    this.authService.logout().then(()=>{
      localStorage.removeItem('userId')
    })
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    if(this.userId) this.router.navigate(['/'])
  }
}

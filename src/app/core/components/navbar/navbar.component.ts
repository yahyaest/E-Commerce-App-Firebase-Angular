import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartId!: string | null;
  userId!: string | null;
  constructor(private authService: AuthService, private router: Router) {}

  goToCartPage() {
    this.router.navigate(['cart', `${this.cartId}`]);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout().then(()=>{
      localStorage.removeItem('userId')
      this.router.navigate(['/'])
    })
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.cartId = localStorage.getItem('cartId');
    // NgRx for cartId and userId
  }
}

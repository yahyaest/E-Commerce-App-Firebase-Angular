import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartId! : string | null

  constructor(private router:Router) { }

  goToCartPage(){
    this.router.navigate(['cart',`${this.cartId}`])
  }

  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId');
    // NgRx for cartId
  }

}

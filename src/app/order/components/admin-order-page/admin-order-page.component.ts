import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/models/user.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-order-page',
  templateUrl: './admin-order-page.component.html',
  styleUrls: ['./admin-order-page.component.css'],
})
export class AdminOrderPageComponent implements OnInit {
  orders!: Order[];
  user!: User;
  isLoading = true;

  constructor(private orderService: OrderService, private router: Router) {}

  /////// add admin/moderator remove notification

  getOrders() {
    this.orderService
      .getOrders()
      .subscribe((res) => (this.orders = res as any));
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId);
  }

  goToOrderPage(orderId: string) {
    this.router.navigate(['order', `${orderId}`]);
  }

  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem('user') as string);    
    ['MODERATOR', 'ADMIN'].includes(this.user.role)
      ? await this.getOrders()
      : this.router.navigate(['/']);
    this.isLoading = false;
  }
}

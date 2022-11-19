import { Component, OnInit } from '@angular/core';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
})
export class NotificationsListComponent implements OnInit {
  notifications!: Notification[];

  constructor(private notificationService: NotificationService) {}

  getNotifications() {
    this.notificationService
      .getNotifications()
      .subscribe(
        (res) =>
          (this.notifications = res.sort(
            (a: any, b: any) =>
              Date.parse(b.created_at) - Date.parse(a.created_at)
          ).slice(0,5) as Notification[])
      );
  }

  ngOnInit(): void {
    this.getNotifications();
  }
}

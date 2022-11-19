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

  async getNotifications() {
    const email = JSON.parse(localStorage.getItem('user') as string)?.email;
    const notificationsDocument = await this.notificationService.getUserNotifications(
      email
    );
    let notifications : Notification[] = []
    for (let notification of notificationsDocument){
      notifications.push(notification.data() as Notification)
    }
    this.notifications = notifications
      .sort(
        (a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at)
      )
      .slice(0, 5) as Notification[];
  }

  async ngOnInit(): Promise<void> {
    await this.getNotifications();
  }
}

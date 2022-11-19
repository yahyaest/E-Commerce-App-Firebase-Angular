import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    NotificationsListComponent
  ],
  imports: [
    CommonModule,NgbModule
  ],
  exports:[NotificationsListComponent]
})
export class NotificationModule { }

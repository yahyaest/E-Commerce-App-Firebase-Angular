import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NotificationModule } from '../notification/notification.module';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent, NavbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule,MatListModule,NgbModule,NotificationModule],
  exports: [NavbarComponent],
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent, NavbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [NavbarComponent],
})
export class CoreModule {}

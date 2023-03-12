import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from '../app-routing.module';
import { CollectionProductsComponent } from './components/collection-products/collection-products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminProductPageComponent } from './components/admin-product-page/admin-product-page.component';
import { UploadProductsComponent } from './components/upload-products/upload-products.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductPageComponent,
    ProductCardComponent,
    CollectionProductsComponent,
    AdminProductPageComponent,
    UploadProductsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
})
export class ProductsModule {}

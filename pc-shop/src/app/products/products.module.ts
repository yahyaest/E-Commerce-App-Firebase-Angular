import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from '../app-routing.module';
import { CollectionProductsComponent } from './components/collection-products/collection-products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductPageComponent,
    ProductCardComponent,
    CollectionProductsComponent,
  ],
  imports: [CommonModule, AppRoutingModule, NgbModule],
})
export class ProductsModule {}

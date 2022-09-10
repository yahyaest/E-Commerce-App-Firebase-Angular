import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionProductsComponent } from './products/components/collection-products/collection-products.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ProductPageComponent } from './products/components/product-page/product-page.component';
import { ProductsComponent } from './products/components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products/:collection/:slug',
    component: ProductPageComponent,
  },
  {
    path: 'products/:collection',
    component: CollectionProductsComponent,
  },
  { path: 'products', component: ProductsComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

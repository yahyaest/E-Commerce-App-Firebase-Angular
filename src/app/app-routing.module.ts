import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionProductsComponent } from './products/components/collection-products/collection-products.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ProductPageComponent } from './products/components/product-page/product-page.component';
import { ProductsComponent } from './products/components/products/products.component';
import { CartPageComponent } from './cart/components/cart-page/cart-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { OrderPageComponent } from './order/components/order-page/order-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UserOrdersComponent } from './order/components/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'login',
    component: LoginPageComponent, 
  },
  { path: 'user/:username', component: UserPageComponent },
  {
    path: 'products/:collection/:slug',
    component: ProductPageComponent,
  },
  {
    path: 'products/:collection',
    component: CollectionProductsComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'cart/:id', component: CartPageComponent },
  { path: 'order/:id', component: OrderPageComponent },
  { path: 'orders/:username', component: UserOrdersComponent },
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

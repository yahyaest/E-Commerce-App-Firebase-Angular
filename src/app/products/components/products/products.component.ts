import { Component, OnInit } from '@angular/core';

import { Collection } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Collection[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .subscribe((result) => (this.products = result));
  }
}

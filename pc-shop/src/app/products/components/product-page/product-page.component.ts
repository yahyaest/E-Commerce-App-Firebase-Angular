import { Component, OnInit } from '@angular/core';
import { collection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    const urlParam = {
      collection: this.route.snapshot.paramMap.get('collection'),
      slug: this.route.snapshot.paramMap.get('slug'),
    };

    this.productsService
      .getProduct(urlParam)
      .subscribe((result) => (this.product = result));
  }

  ngOnInit(): void {
    this.product = history.state;
  }
}

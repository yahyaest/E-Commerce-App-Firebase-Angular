import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-collection-products',
  templateUrl: './collection-products.component.html',
  styleUrls: ['./collection-products.component.css'],
})
export class CollectionProductsComponent implements OnInit {
  isLoading = true;
  loadingProgress = 0;
  collection_title!: string | null;
  collection_products!: Product[];
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {
    const urlParam = this.route.snapshot.paramMap.get('collection');

    this.productsService.getCollectionProducts(urlParam).subscribe((result) => {
      this.collection_title = result.collection_title;
      this.collection_products = result.collection_products;
      this.isLoading = false;
    });

  }

  ngOnInit(): void {
    this.collection_products = history.state.value;
    this.collection_title = history.state.key;

    for (let index = 0; index <= 100; index++) {
      setTimeout(() => {
        this.loadingProgress = index;
      }, index * 30);
    }
  }
}

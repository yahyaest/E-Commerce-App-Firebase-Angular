import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  tags = [
    'Guaranteed',
    'Best Offer',
    'Refundable',
    'New',
    'Users Choice',
    'Sustainable',
  ];
  price!: number;
  productTags: string[] = [];
  productPromotion!: number;
  constructor() {}

  getTags() {
    let productTags = [];
    const tags = [...this.tags];
    const tagsNumber = Math.floor(Math.random() * 4);
    for (let index = 0; index < tagsNumber; index++) {
      const choice = Math.floor(Math.random() * tags.length);
      productTags.push(tags[choice]);
      tags.splice(choice, 1);
    }
    this.productTags = productTags;
  }

  getPromotion() {
    const promotions = [
      { value: 0, occurence: 25 },
      { value: 5, occurence: 20 },
      { value: 10, occurence: 15 },
      { value: 15, occurence: 12 },
      { value: 20, occurence: 10 },
      { value: 25, occurence: 7 },
      { value: 30, occurence: 5 },
      { value: 40, occurence: 3 },
      { value: 50, occurence: 2 },
      { value: 60, occurence: 1 },
    ];
    let promotionsTable = [];
    for (let promotion of promotions) {
      for (let index = 0; index < promotion.occurence; index++) {
        promotionsTable.push(promotion.value);
      }
    }
    const choice = Math.floor(Math.random() * promotionsTable.length);

    this.productPromotion = promotionsTable[choice];
  }

  ngOnInit(): void {
    this.price =
      +this.product.price
        .replace('TND', '')
        .replace(',', '')
        .replace(' ', '')
        .replace(/(?! )\s/g, '') / 1000;
    this.getPromotion();
    this.getTags();
  }
}
('1 479000');

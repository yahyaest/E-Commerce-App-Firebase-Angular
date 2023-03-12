import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import pc from '../../../../assets/data/pc.json';
import pcGamer from '../../../../assets/data/pcGamer.json';
import laptop from '../../../../assets/data/laptop.json';
import monitor from '../../../../assets/data/monitor.json';
import cpu from '../../../../assets/data/cpu.json';
import gpu from '../../../../assets/data/gpu.json';
import ram from '../../../../assets/data/ram.json';
import hdd from '../../../../assets/data/hdd.json';
import ssd from '../../../../assets/data/ssd.json';
import { Product } from '../../models/product.model';

interface PcComponent {
  value: string;
  viewValue: string;
  data: Product[];
}

@Component({
  selector: 'app-upload-products',
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.css'],
})
export class UploadProductsComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  components: PcComponent[] = [
    { value: 'pc', viewValue: 'PC', data: pc },
    { value: 'pcGamer', viewValue: 'PcGamer', data: pcGamer },
    { value: 'laptop', viewValue: 'Laptop', data: laptop },
    { value: 'monitor', viewValue: 'Monitor', data: monitor },
    { value: 'cpu', viewValue: 'CPU', data: cpu },
    { value: 'gpu', viewValue: 'GPU', data: gpu },
    { value: 'ram', viewValue: 'RAM', data: ram },
    { value: 'hdd', viewValue: 'HDD', data: hdd },
    { value: 'ssd', viewValue: 'SSD', data: ssd },
  ];
  collection: string = '';

  async postProductCollection(collection: string) {
    let collectionProducts = this.components.filter(
      (component) => component.value === collection
    )[0];

    if (collection === 'laptop') {
      await this.productService.addCollectionProducts({
        laptop: collectionProducts.data.slice(0,499),
      });
      this.productService.addCollectionProducts({
        laptop2 : collectionProducts.data.slice(500, collectionProducts.data.length),
      });
    } else {
      this.productService.addCollectionProducts({
        [collectionProducts.value]: collectionProducts.data,
      });
    }
  }

  ngOnInit(): void {}
}

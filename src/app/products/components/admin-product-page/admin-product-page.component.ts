import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/models/user.model';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-admin-product-page',
  templateUrl: './admin-product-page.component.html',
  styleUrls: ['./admin-product-page.component.css'],
})
export class AdminProductPageComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}
  user!: User;
  isLoading = true;
  products: Product[] = [];

  async getProducts() {
    let productsByCollection = [];
    await this.productService.getProducts().subscribe((res) => {
      productsByCollection = res;
      for(let collection of productsByCollection){
        const collectionProduct = collection[Object.keys(collection)[0]]
       for(let product of collectionProduct){
        this.products.push(product)
       }
      }
    });
  }

    
  getCollectionById(id:number){
  const collection = ["PC", "Pc Gamer","Laptop","Monitor","CPU","GPU", "Ram","HDD","SSD"]
  return collection[id - 1]
  }


  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    ['MODERATOR', 'ADMIN'].includes(this.user.role)
      ? await this.getProducts()
      : this.router.navigate(['/']);
    this.isLoading = false;
  }
}

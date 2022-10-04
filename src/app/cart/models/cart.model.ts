import { Product } from '../../products/models/product.model';

export interface Cart {
 products :{product :Product, quantity : number}[];
 totalPrice : number;
 created_at?: string;
 last_update?: string;
}
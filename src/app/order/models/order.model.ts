import { Product } from '../../products/models/product.model';

const state = ['Not Started','In Progress','Delivered', 'Canceled'] as const
type OrderState = typeof state[number]

export interface Order {
 id?:any;
 products :{product :Product, quantity : number}[];
 totalPrice : number;
 created_at?: string;
 last_update?: string;
 status: OrderState;
 clientEmail:string;
}

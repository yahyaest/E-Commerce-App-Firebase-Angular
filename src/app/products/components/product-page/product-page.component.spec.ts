import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { DocumentData, DocumentSnapshot, Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Cart } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let productServer: ProductsService;
  let cartService: CartService;
  let route: ActivatedRoute;
  let activatedRouteSpy: any;
  let firestore:jasmine.SpyObj<Firestore>
  let product: Product;
  let cart : Cart;
  let quantity: number;
  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({ collection: 'collection', slug: 'slug' }),
      },
    };
 //  const firestoreSpy = jasmine.createSpyObj('Firestore',['collection'] );

    await TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      imports: [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        ProductsService,CartService,
   //    { provide: Firestore, usevalue: firestoreSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();
   // firestore = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>
    route = TestBed.inject(ActivatedRoute);
    productServer = TestBed.inject(ProductsService);
    cartService = TestBed.inject(CartService);
  });

  beforeEach(() => {
    // productServer = new ProductsService(null as any);
    // cartService = new CartService(null as any);
    // route = jasmine.createSpyObj('ActivatedRoute', ['snaphot']);
    // component = new ProductPageComponent(productServer, cartService, route);

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    product = {
      collection_id: 1,
      description: null,
      images: null,
      inventory: 5,
      last_update: 'last_update',
      price: '750 TND',
      slug: 'slug',
      title: 'title',
    };
    quantity = 1;
    cart = {
      products: [
        {
          product: {
            collection_id: 4,
            description: null,
            images: null,
            inventory: 7,
            last_update: 'last_update',
            price: '1000 TND',
            slug: 'slug',
            title: 'title',
          },
          quantity: 3,
        },
        {
          product: {
            collection_id: 4,
            description: null,
            images: null,
            inventory: 7,
            last_update: 'last_update',
            price: '500 TND',
            slug: 'slug',
            title: 'title',
          },
          quantity: 4,
        },
      ],
      totalPrice: 5000,
      created_at: new Date().toISOString(),
      last_update: undefined,
    };   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase product quantity', () => {
    component.product = product;
    component.increaseQuantity();
    expect(component.quantity).toEqual(2);
  });

  it('should increase product quantity', () => {
    component.product = product;
    component.quantity = 5
    component.decreaseQuantity();
    expect(component.quantity).toEqual(4);
  });

  it('should get cart', async () => {
    const cartSnapshot = {
      id: 1,
      data: () => {
        return cart;
      },
    } as unknown as Promise<DocumentSnapshot<DocumentData>>;

    const spy = spyOn(cartService, 'getCart').and.returnValue(
      Promise.resolve(cartSnapshot)
    );
    await component.getCart(); // spied function need to be called here to be added in calls.mostRecenet()
    const spyResult = spy.calls.mostRecent().returnValue.then((res) => {
      return res.data() as Cart;
    });

    expect(spy).toHaveBeenCalled()
    expect(component.cart).toBe(await spyResult);
    expect(component.cart.totalPrice).toBe((await spyResult).totalPrice);
  });

  it('addOrUpdateCart() should add cart', ()=>{
    component.product = product
    component.cart = cart

    const spy = spyOn(cartService, 'addCart').and.callThrough();
    const spy2 = spyOn(cartService, 'updateCart').and.callThrough();

    localStorage.removeItem('cartId')
    component.addOrUpdateCart()

    expect(spy).toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

  })

  it('addOrUpdateCart() should update cart', ()=>{
    component.product = product
    component.cart = cart

    const spy = spyOn(cartService, 'addCart').and.callThrough();
    const spy2 = spyOn(cartService, 'updateCart').and.callThrough();

    component.addOrUpdateCart()

    expect(spy).not.toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()

  })

  it('should add cart', async () => {
    component.cart = { products: [], totalPrice: 0 };
    component.product = product
    component.quantity = 3

   const spy = spyOn(cartService, 'addCart').and.callThrough();

  component.addCart();

  const productPrice = +component.product.price.split('TND')[0].replace(',', '.');

  expect(spy).toHaveBeenCalled()
  expect(component.cart.products.length).toEqual(1)
  expect(component.cart.totalPrice).toEqual(productPrice *component.quantity)
  expect(component.cart.created_at?.slice(0, -5)).toEqual(new Date().toISOString().slice(0,-5))
  });

  it('should update cart', async () => {
    cart.products[0].quantity = 5;
    cart.totalPrice = 7000;
    component.cart = cart;
    component.product = product
    component.quantity = 2

    const spy = spyOn(cartService, 'updateCart')
      .withArgs(cart)
      .and.returnValue(Promise.resolve(cart as any));
    cartService.updateCart(cart);
    const spyResult = spy.calls.mostRecent().returnValue.then(() => {
    return cart
    });
  
  component.updateCart(cart);

  expect(spy).toHaveBeenCalled()
  expect(cart.products.length).toEqual(3)
  expect(cart.totalPrice).toEqual((await spyResult).totalPrice)
  expect(cart.last_update).toEqual((await spyResult).last_update)
  });

});


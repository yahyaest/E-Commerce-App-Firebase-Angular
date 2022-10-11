import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

import { CartPageComponent } from './cart-page.component';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let service: CartService;
  let router: Router;
  let cart: Cart;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    service = new CartService(null as any);
    router = jasmine.createSpyObj("Router", ["navigate"]);
    component = new CartPageComponent(service, router);
    // fixture = TestBed.createComponent(CartPageComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
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

  it('should delete product from cart', () => {
    component.cart = cart;
    component.deleteCartProduct(1);
    expect(component.cart.totalPrice).toEqual(3000);
    expect(component.cart.products.length).toEqual(1);
  });

  it('should update cart product quantity', () => {
    component.prevQuantities = [3, 4];
    component.cart = cart;
    component.updateCartProductQuantity(1, 9);
    expect(component.cart.products[1].quantity).toEqual(9);
    expect(component.cart.totalPrice).toEqual(7500);
    expect(component.cart.products.length).toEqual(2);
  });

  it('should get cart data', async () => {
    const cartSnapshot = {
      id: 1,
      data: () => {
        return cart;
      },
    } as unknown as Promise<DocumentSnapshot<DocumentData>>;

    const spy = spyOn(service, 'getCart').and.returnValue(
      Promise.resolve(cartSnapshot)
    );
    await component.ngOnInit(); // spied function need to be called here to be added in calls.mostRecenet()
    const spyResult = spy.calls.mostRecent().returnValue.then((res) => {
      return res.data() as Cart;
    });

    expect(spy).toHaveBeenCalled()
    expect(component.cart).toBe(await spyResult);
    expect(component.cart.totalPrice).toBe((await spyResult).totalPrice);
    expect(component.isLoading).toBe(false);
    expect(component.prevQuantities).toEqual([3, 4]);
  });

  it('should update cart', async () => {
    cart.products[0].quantity = 5;
    cart.totalPrice = 7000;
    component.cart = cart;

    const spy = spyOn(service, 'updateCart')
      .withArgs(cart)
      .and.returnValue(Promise.resolve(cart as any));
    service.updateCart(cart);
    const spyResult = spy.calls.mostRecent().returnValue.then(() => {
    return cart
    });
  
  component.updateCart(cart);

  expect(spy).toHaveBeenCalled()
  expect(cart.last_update).toEqual((await spyResult).last_update)

  });

  it('should delete cart',async()=>{
    const spy = spyOn(service, 'deleteCart').and.returnValue(
      Promise.resolve()
    );
    component.deleteCart()
    expect(spy).toHaveBeenCalled()
  })
});

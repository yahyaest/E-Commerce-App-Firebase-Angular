import { createReducer, on } from '@ngrx/store';
import {
  getUserId,
  setUserId,
  removeUserId,
  getCartId,
  removeCartId,
  setCartId,
  getOrderId,
  removeOrderId,
  setOrderId,
} from '../actions/navbar.action';

export interface StoreState {
  userId: string | null;
  cartId: string | null;
  orderId: string | null;
}

export const initialState: StoreState = { userId: null, cartId: null,orderId:null };

export const navbarReducer = createReducer(
  initialState,
  on(getUserId, (state) => ({
    ...state,
    userId: localStorage.getItem('userId'),
  })),
  on(setUserId, (state, props) => ({
    ...state,
    userId: props.userId,
  })),
  on(removeUserId, (state) => ({
    ...state,
    userId: null,
  })),

  on(getCartId, (state) => ({
    ...state,
    cartId: localStorage.getItem('cartId'),
  })),
  on(setCartId, (state, props) => ({
    ...state,
    cartId : props.cartId,
  })),
  on(removeCartId, (state) => ({
    ...state,
    cartId: null
  })),

  on(getOrderId, (state) => ({
    ...state,
    orderId: localStorage.getItem('orderId'),
  })),
  on(setOrderId, (state, props) => ({
    ...state,
    orderId : props.orderId,
  })),
  on(removeOrderId, (state) => ({
    ...state,
    orderId: null
  }))
);

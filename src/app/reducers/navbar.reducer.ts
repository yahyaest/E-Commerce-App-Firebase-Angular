import { createReducer, on } from '@ngrx/store';
import {
  getUserId,
  setUserId,
  removeUserId,
  getCartId,
  removeCartId,
  setCartId,
} from '../actions/navbar.action';

export interface StoreState {
  userId: string | null;
  cartId: string | null;
}

export const initialState: StoreState = { userId: null, cartId: null };

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
  }))
);

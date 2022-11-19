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
  getUsername,
  setUsername,
  removeUsername,
  getNotifications,
  removeNotifications,
  setNotifications,
  getIsOrderIcon,
  setIsOrderIcon,
  removeIsOrderIcon,
} from '../actions/navbar.action';

export interface StoreState {
  userId: string | null;
  cartId: string | null;
  orderId: string | null;
  username: string | null;
  notifications: number;
  isOrderIcon: boolean;
}

export const initialState: StoreState = {
  userId: null,
  cartId: null,
  orderId: null,
  username: null,
  notifications: 0,
  isOrderIcon: false,
};

export const navbarReducer = createReducer(
  initialState,

  // UserId
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

  // CartId
  on(getCartId, (state) => ({
    ...state,
    cartId: localStorage.getItem('cartId'),
  })),
  on(setCartId, (state, props) => ({
    ...state,
    cartId: props.cartId,
  })),
  on(removeCartId, (state) => ({
    ...state,
    cartId: null,
  })),

  // OrderId
  on(getOrderId, (state) => ({
    ...state,
    orderId: localStorage.getItem('orderId'),
  })),
  on(setOrderId, (state, props) => ({
    ...state,
    orderId: props.orderId,
  })),
  on(removeOrderId, (state) => ({
    ...state,
    orderId: null,
  })),

    // Order Icon
    on(getIsOrderIcon, (state) => ({
      ...state,
      isOrderIcon:  JSON.parse(localStorage.getItem('isOrderIcon') as string),
    })),
    on(setIsOrderIcon, (state, props) => ({
      ...state,
      isOrderIcon: props.isOrderIcon,
    })),
    on(removeIsOrderIcon, (state) => ({
      ...state,
      isOrderIcon: false,
    })),

  // Username
  on(getUsername, (state) => ({
    ...state,
    username: JSON.parse(localStorage.getItem('user') as string)?.username,
  })),
  on(setUsername, (state, props) => ({
    ...state,
    username: props.username,
  })),
  on(removeUsername, (state) => ({
    ...state,
    username: null,
  })),

  // Notifications
  on(getNotifications, (state, props) => ({
    ...state,
    notifications: props.notifications,
  })),
  on(setNotifications, (state, props) => ({
    ...state,
    notifications: props.notifications,
  })),
  on(removeNotifications, (state) => ({
    ...state,
    notifications: 0,
  }))
);

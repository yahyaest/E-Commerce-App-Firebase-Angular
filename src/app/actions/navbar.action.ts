import { createAction } from '@ngrx/store';

// UserId
export const getUserId = createAction('[Navbar Component] GetUserId');
export const setUserId = createAction(
  '[Navbar Component] SetUserId',
  (userId: string) => ({ userId })
);
export const removeUserId = createAction('[Navbar Component] RemoveUserId');

// CartId
export const getCartId = createAction('[Navbar Component] GetCartId');
export const setCartId = createAction(
  '[Navbar Component] SetCartId',
  (cartId: string) => ({ cartId })
);
export const removeCartId = createAction('[Navbar Component] RemoveCartId');

// OrderId
export const getOrderId = createAction('[Navbar Component] GetOrderId');
export const setOrderId = createAction(
  '[Navbar Component] SetOrderId',
  (orderId: string) => ({ orderId })
);
export const removeOrderId = createAction('[Navbar Component] RemoveOrderId');

// Username
export const getUsername = createAction('[Navbar Component] GetUsername');
export const setUsername = createAction(
  '[Navbar Component] SetUsername',
  (username: string) => ({ username })
);
export const removeUsername = createAction('[Navbar Component] RemoveUsername');

// Notifications
export const getNotifications = createAction(
  '[Navbar Component] getNotifications',
  (notifications: number) => ({ notifications })
);
export const setNotifications = createAction(
  '[Navbar Component] setNotifications',
  (notifications: number) => ({ notifications })
);
export const removeNotifications = createAction(
  '[Navbar Component] removeNotifications'
);

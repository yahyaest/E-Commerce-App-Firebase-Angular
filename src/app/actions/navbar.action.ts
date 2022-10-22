import { createAction, props } from '@ngrx/store';

export const getUserId = createAction('[Navbar Component] GetUserId');
export const setUserId = createAction(
  '[Navbar Component] SetUserId',
  (userId: string) => ({ userId })
);
export const removeUserId = createAction('[Navbar Component] RemoveUserId');

export const getCartId = createAction('[Navbar Component] GetCartId');
export const setCartId = createAction(
  '[Navbar Component] SetCartId',
  (cartId: string) => ({ cartId })
);
export const removeCartId = createAction('[Navbar Component] RemoveCartId');
